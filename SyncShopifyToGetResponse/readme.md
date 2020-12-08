## Sync Shopify customer to GetResponse without install an app (Birthday)



Since GetResponse app in shopify is not support the custom fields, this script is show a sample how push the shopify birthday to getresponse. 
Also Shopify not support the birthday fields too, it using the note fields, so you may need change it extra data method to get you want data. 



# How to Work?
1. Create an API token in GetResponse 
2. Get the List Token from GetResponse
3. Update the getResponseListToken and apiKey setting 
4. Create a Google App Script project and copy the script into the code.
5. Click run button to install in app script editor toolbar
6. Deploy the script as web app. 
7. Copy the web app url. 
8. Go to shopify store notification pannel admin
9. Create Customer Create/Update Webhook in WebHook area
10. Paste the google app script web app url there.
11. that's all

Shopfiy customer webook data sample:
```json
{
    "id": 706405506930370000,
    "email": "bob@biller.com",
    "accepts_marketing": true,
    "created_at": null,
    "updated_at": null,
    "first_name": "Bob",
    "last_name": "Biller",
    "orders_count": 0,
    "state": "disabled",
    "total_spent": "0.00",
    "last_order_id": null,
    "note": "This customer loves ice cream",
    "verified_email": true,
    "multipass_identifier": null,
    "tax_exempt": false,
    "phone": null,
    "tags": "",
    "last_order_name": null,
    "currency": "SGD",
    "addresses": [],
    "accepts_marketing_updated_at": null,
    "marketing_opt_in_level": null,
    "admin_graphql_api_id": "gid://shopify/Customer/706405506930370084"
}
```