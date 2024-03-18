module.exports = {
    DB_NAME: "ecom_db",
    DB_URL: "mongodb://0.0.0.0/ecom_db"   // instead of 0.0.0.0, we can even write localhost 
}

// IP of localhost is '0.0.0.0'.
// When a server is configured to listen on 0.0.0.0, it means that the server will accept connections
// from any available network interface, whether it's the loopback interface (127.0.0.1) or any other
// network interfaces that the machine has.
// While, '127.0.0.1' is a loopback address commonly referred to as "localhost". It's a
// special-purpose IP address that is used to refer to the local machine.
