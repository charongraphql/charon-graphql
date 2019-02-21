/* eslint-disable */

const result = {
  "data": {
    "authors": [
      {
        "__typename": "Author",
        "id": "1",
        "name": "ben",
        "listing": [
          {
            "__typename": "Listing",
            "id": "66",
            "title": "refrigerator",
            "author": {
              "__typename": "Author",
              "id": "1",
              "name": "ben"
            }
          }
        ]
      },
      {
        "__typename": "Author",
        "id": "2",
        "name": "chang",
        "listing": [
          {
            "__typename": "Listing",
            "id": "67",
            "title": "Large Trampoline",
            "author": {
              "__typename": "Author",
              "id": "2",
              "name": "chang"
            }
          },
          {
            "__typename": "Listing",
            "id": "68",
            "title": "big bowl of jello",
            "author": {
              "__typename": "Author",
              "id": "2",
              "name": "chang"
            }
          }
        ]
      },
      {
        "__typename": "Author",
        "id": "3",
        "name": "joel",
        "listing": [
          {
            "__typename": "Listing",
            "id": "53",
            "title": "Television",
            "author": {
              "__typename": "Author",
              "id": "3",
              "name": "joel"
            }
          }
        ]
      }
    ]
  }
}

module.exports =  result;
