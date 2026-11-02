async function runE2ETests() {
  console.log("==================================================");
  console.log("AR JISHAN E-COMMERCE SERVICE — E2E TEST SUITE");
  console.log("==================================================");

  const baseUrl = "http://localhost:3000";
  let passed = 0;
  let total = 0;

  async function test(name, fn) {
    total++;
    try {
      await fn();
      console.log(`✓ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`✗ FAIL: ${name} ->`, err.message);
    }
  }

  // 1. Homepage
  await test("Homepage returns HTTP 200 and renders brand", async () => {
    const res = await fetch(`${baseUrl}/`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes("AR JISHAN") && !text.includes("JISHAN")) {
      throw new Error("Brand name not found in homepage output");
    }
  });

  // 2. Shop Catalog Page
  await test("Shop Catalog page returns HTTP 200", async () => {
    const res = await fetch(`${baseUrl}/shop`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
  });

  // 3. Product Details Page
  await test("Product Details Page (/products/wireless-anc-bluetooth-earbuds) returns HTTP 200", async () => {
    const res = await fetch(`${baseUrl}/products/wireless-anc-bluetooth-earbuds`);
    if (res.status !== 200) throw new Error(`Status ${res.status}`);
    const text = await res.text();
    if (!text.includes("Wireless ANC")) throw new Error("Product title missing");
  });

  // 4. Coupon Validation API
  await test("Coupon Validation API: Valid coupon ARJISHAN10", async () => {
    const res = await fetch(`${baseUrl}/api/coupons/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "ARJISHAN10", subtotal: 3000 }),
    });
    const data = await res.json();
    if (!data.valid || data.discount !== 300) {
      throw new Error(`Unexpected coupon response: ${JSON.stringify(data)}`);
    }
  });

  // 5. Order Creation API (COD Flow)
  let createdOrderNumber = "";
  await test("Order Creation API: Cash on Delivery with Bangladesh Phone & Address", async () => {
    const payload = {
      customer_name: "Zubair Rahman",
      customer_phone: "01755667788",
      customer_email: "zubair@example.com",
      shipping_division: "Dhaka",
      shipping_district: "Dhaka",
      shipping_upazila: "Dhanmondi",
      shipping_address: "House 24, Road 7, Dhanmondi, Dhaka",
      payment_method: "cod",
      items: [
        {
          product_id: "prod-1",
          quantity: 1,
        },
      ],
    };

    const res = await fetch(`${baseUrl}/api/orders/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success || !data.order) {
      throw new Error(`Order creation failed: ${JSON.stringify(data)}`);
    }

    if (!data.order.order_number.startsWith("ARJ-2026-")) {
      throw new Error(`Invalid order number format: ${data.order.order_number}`);
    }

    if (data.order.total_amount <= 0) {
      throw new Error(`Invalid server-recalculated total: ${data.order.total_amount}`);
    }

    createdOrderNumber = data.order.order_number;
    console.log(`   -> Created Order: ${createdOrderNumber} | Total: ৳${data.order.total_amount}`);
  });

  // 6. Live Public Order Tracking
  await test("Live Order Tracking: Track created order", async () => {
    if (!createdOrderNumber) throw new Error("No order number from previous test");
    const res = await fetch(`${baseUrl}/api/orders/track?orderNumber=${createdOrderNumber}&phone=01755667788`);
    const data = await res.json();
    if (!data.success || !data.order) {
      throw new Error(`Tracking lookup failed: ${JSON.stringify(data)}`);
    }
    if (data.order.order_number !== createdOrderNumber) {
      throw new Error("Order number mismatch in tracking");
    }
  });

  // 7. Order Creation & Digital Payment Verification (bKash Flow)
  await test("Order Creation & Digital Payment Flow (bKash sandbox verification)", async () => {
    const payload = {
      customer_name: "Sadia Islam",
      customer_phone: "01822334455",
      shipping_division: "Chattogram",
      shipping_district: "Chattogram",
      shipping_address: "Nasirabad Housing Society, Chattogram",
      payment_method: "bkash",
      items: [{ product_id: "prod-2", quantity: 1 }],
    };

    const createRes = await fetch(`${baseUrl}/api/orders/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const createData = await createRes.json();
    if (!createData.success) throw new Error("bKash order creation failed");

    const orderNum = createData.order.order_number;

    // Simulate verification callback from sandbox
    const verifyRes = await fetch(`${baseUrl}/api/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: orderNum,
        gateway: "bkash",
        status: "success",
        transactionId: "BKASH-984210",
      }),
    });
    const verifyData = await verifyRes.json();
    if (!verifyData.success) throw new Error("Payment verification failed");

    // Check that order status is now processing and paid
    const checkRes = await fetch(`${baseUrl}/api/orders/track?orderNumber=${orderNum}`);
    const checkData = await checkRes.json();
    if (checkData.order.payment_status !== "paid" || checkData.order.order_status !== "processing") {
      throw new Error(`Status not updated to paid/processing: ${JSON.stringify(checkData.order)}`);
    }
    console.log(`   -> Verified bKash payment for order ${orderNum}: Status is ${checkData.order.order_status}, Paid: ${checkData.order.payment_status}`);
  });

  // 8. Admin APIs & Views
  await test("Admin Orders API returns active order records", async () => {
    const res = await fetch(`${baseUrl}/api/admin/orders`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.orders) || data.orders.length === 0) {
      throw new Error(`Admin orders endpoint failed: ${JSON.stringify(data)}`);
    }
  });

  // 9. Admin Products API
  await test("Admin Products API returns catalog", async () => {
    const res = await fetch(`${baseUrl}/api/products`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.products) || data.products.length === 0) {
      throw new Error(`Admin products endpoint failed: ${JSON.stringify(data)}`);
    }
  });

  // 10. Public static pages
  await test("Public informational pages (/about, /contact, /shipping-policy, /returns)", async () => {
    for (const path of ["/about", "/contact", "/shipping-policy", "/returns", "/track-order"]) {
      const res = await fetch(`${baseUrl}${path}`);
      if (res.status !== 200) throw new Error(`Path ${path} returned status ${res.status}`);
    }
  });

  console.log("==================================================");
  console.log(`TEST RESULTS: ${passed}/${total} PASSED`);
  console.log("==================================================");

  if (passed !== total) {
    process.exit(1);
  }
}

runE2ETests();
