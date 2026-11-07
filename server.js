const express = require("express");
const mysql = require("mysql2");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect public folder
app.use(express.static("public"));

// ================= MYSQL CONNECTION =================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "restaurant_reservation_db"
});

db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed:", err);
    } else {
        console.log("MySQL Database Connected Successfully!");
    }
});


// ================= CUSTOMER CRUD =================

// READ CUSTOMERS
app.get("/customers", (req, res) => {
    db.query("SELECT * FROM customers", (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

// CREATE CUSTOMER
app.post("/customers", (req, res) => {
    const { name, email, phone, password } = req.body;

    db.query(
        "INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)",
        [name, email, phone, password],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Customer Added Successfully!");
        }
    );
});

// UPDATE CUSTOMER
app.put("/customers/:id", (req, res) => {
    const { name, email, phone, password } = req.body;

    db.query(
        "UPDATE customers SET name=?, email=?, phone=?, password=? WHERE customer_id=?",
        [name, email, phone, password, req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Customer Updated Successfully!");
        }
    );
});

// DELETE CUSTOMER
app.delete("/customers/:id", (req, res) => {
    db.query(
        "DELETE FROM customers WHERE customer_id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Customer Deleted Successfully!");
        }
    );
});


// ================= RESTAURANT TABLES CRUD =================

// READ TABLES
app.get("/tables", (req, res) => {
    db.query("SELECT * FROM restaurant_tables", (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

// CREATE TABLE
app.post("/tables", (req, res) => {
    const { table_number, seating_capacity, location, status } = req.body;

    db.query(
        "INSERT INTO restaurant_tables (table_number, seating_capacity, location, status) VALUES (?, ?, ?, ?)",
        [table_number, seating_capacity, location, status],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Restaurant Table Added Successfully!");
        }
    );
});

// UPDATE TABLE
app.put("/tables/:id", (req, res) => {
    const { table_number, seating_capacity, location, status } = req.body;

    db.query(
        "UPDATE restaurant_tables SET table_number=?, seating_capacity=?, location=?, status=? WHERE table_id=?",
        [table_number, seating_capacity, location, status, req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Restaurant Table Updated Successfully!");
        }
    );
});

// DELETE TABLE
app.delete("/tables/:id", (req, res) => {
    db.query(
        "DELETE FROM restaurant_tables WHERE table_id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Restaurant Table Deleted Successfully!");
        }
    );
});


// ================= RESERVATIONS CRUD =================

// READ RESERVATIONS
app.get("/reservations", (req, res) => {
    db.query("SELECT * FROM reservations", (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

// CREATE RESERVATION
app.post("/reservations", (req, res) => {
    const {
        customer_id,
        table_id,
        reservation_date,
        reservation_time,
        guests,
        status
    } = req.body;

    db.query(
        "INSERT INTO reservations (customer_id, table_id, reservation_date, reservation_time, guests, status) VALUES (?, ?, ?, ?, ?, ?)",
        [customer_id, table_id, reservation_date, reservation_time, guests, status],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Reservation Added Successfully!");
        }
    );
});

// UPDATE RESERVATION
app.put("/reservations/:id", (req, res) => {
    const {
        customer_id,
        table_id,
        reservation_date,
        reservation_time,
        guests,
        status
    } = req.body;

    db.query(
        "UPDATE reservations SET customer_id=?, table_id=?, reservation_date=?, reservation_time=?, guests=?, status=? WHERE reservation_id=?",
        [
            customer_id,
            table_id,
            reservation_date,
            reservation_time,
            guests,
            status,
            req.params.id
        ],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Reservation Updated Successfully!");
        }
    );
});

// DELETE RESERVATION
app.delete("/reservations/:id", (req, res) => {
    db.query(
        "DELETE FROM reservations WHERE reservation_id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Reservation Deleted Successfully!");
        }
    );
});


// ================= STAFF CRUD =================

// READ STAFF
app.get("/staff", (req, res) => {
    db.query("SELECT * FROM staff", (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json(result);
    });
});

// CREATE STAFF
app.post("/staff", (req, res) => {
    const { staff_name, email, phone, role, shift } = req.body;

    db.query(
        "INSERT INTO staff (staff_name, email, phone, role, shift) VALUES (?, ?, ?, ?, ?)",
        [staff_name, email, phone, role, shift],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Staff Added Successfully!");
        }
    );
});

// UPDATE STAFF
app.put("/staff/:id", (req, res) => {
    const { staff_name, email, phone, role, shift } = req.body;

    db.query(
        "UPDATE staff SET staff_name=?, email=?, phone=?, role=?, shift=? WHERE staff_id=?",
        [staff_name, email, phone, role, shift, req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Staff Updated Successfully!");
        }
    );
});

// DELETE STAFF
app.delete("/staff/:id", (req, res) => {
    db.query(
        "DELETE FROM staff WHERE staff_id=?",
        [req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            res.send("Staff Deleted Successfully!");
        }
    );
});


// ================= START SERVER =================

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});