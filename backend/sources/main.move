address 0x7c4c26e16031ef4d298582ff295c31eaa0b04110d5f54bc546130c4173344f42 {
module CryptoRadar {
    use std::vector;
    use std::signer;

    struct Alert has key, store,copy {
        crypto_id: vector<u8>,
        price_threshold: u128,
        is_active: bool,
    }

    struct Alerts has key, store {
        user_alerts: vector<Alert>,
    }

    public entry fun create_alert(account: &signer, crypto_id: vector<u8>, price: u128) acquires Alerts {
    let user_addr = signer::address_of(account);

    // Ensure Alerts resource exists for the account, create it if not
    if (!exists<Alerts>(user_addr)) {
        move_to(account, Alerts {
            user_alerts: vector::empty<Alert>(),
        });
    };

    // Add a new alert to the user's Alerts resource
    let alerts = borrow_global_mut<Alerts>(user_addr);
    vector::push_back(&mut alerts.user_alerts, Alert {
        crypto_id,
        price_threshold: price,
        is_active: true,
    });
}


    public entry fun update_alert(account: address, crypto_id: vector<u8>, new_price: u128) acquires Alerts {
    // Ensure Alerts exists for the given address
    if (!exists<Alerts>(account)) {
        abort 0x1; // Alerts resource does not exist
    };

    // Borrow the Alerts resource
    let alerts = borrow_global_mut<Alerts>(account);

    // Find the alert with the given crypto_id
    let len = vector::length(&alerts.user_alerts);
    let i = 0;
    while (i < len) {
        let alert = vector::borrow_mut(&mut alerts.user_alerts, i);
        if (alert.crypto_id == crypto_id) {
            alert.price_threshold = new_price;
            return;
        };
        i = i + 1;
    };

    // If no matching alert is found, abort
    abort 0x2; // Alert with the given crypto_id not found
}



    public entry fun deactivate_alert(account: address, crypto_id: vector<u8>) acquires Alerts {
    // Ensure Alerts exists for the given address
    if (!exists<Alerts>(account)) {
        abort 0x1; // Alerts resource does not exist
    };

    // Borrow the Alerts resource
    let alerts = borrow_global_mut<Alerts>(account);

    // Find the alert with the given crypto_id
    let len = vector::length(&alerts.user_alerts);
    let i = 0;
    while (i < len) {
        let alert = vector::borrow_mut(&mut alerts.user_alerts, i);
        if (alert.crypto_id == crypto_id) {
            alert.is_active = false;
            return;
        };
        i = i + 1;
    };

    // If no matching alert is found, abort
    abort 0x2; // Alert with the given crypto_id not found
}



    public fun get_alerts(account: address): vector<Alert> acquires Alerts {
    // Check if Alerts exists for the given address
    if (!exists<Alerts>(account)) {
        // Return an empty vector if no alerts exist
        return vector::empty<Alert>();
    };

    // Borrow the Alerts resource
    let alerts = borrow_global<Alerts>(account);

    // Return all user alerts
    alerts.user_alerts
}

}
}
