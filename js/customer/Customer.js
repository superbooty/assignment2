Namespace.Register("com.wm.customer");

com.wm.Customer = function(){ return {

    id: 12925980000,
    email: "input@put.com",
    name: {first: "in", last: "put", middleInitial: "a"},
    addressList: [
        {
            type: "home",
            streetNumber: "7000",
            streetName: "Marina blvd",
            city: "Brisbane",
            stateId: "CA",
            stateName: "California",
            zipCode: "94005"

        }
    ],

    wallet: {
        cardType: "Visa",
        lastFourDigits: "2227",
        expirationDate: {Month: "Dec", Year: "2015"},
        cid: "555",
        billingAddress:{
            type: "home",
            streetNumber: "7000",
            streetName: "Marina blvd",
            city: "Brisbane",
            stateId: "CA",
            stateName: "California",
            zipCode: "94005"

        }
    }

};}