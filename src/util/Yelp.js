require('dotenv').config({path:'/../../.env'})

const api_key = process.env.APIKEY

const Yelp = {
  search : function(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      'headers':{'Authorization':`Bearer ${api_key}`}
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => { 
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.category,
            rating: business.rating,
            reviewCount: business.review_count
          }
      })
    }})
  }
}

export default Yelp