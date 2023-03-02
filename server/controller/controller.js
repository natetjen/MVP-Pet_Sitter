const express = require('express');
const db = require('../db/modal.js')
const axios = require('axios')

module.exports = {
  newProfile: (req, res) => {
    db.signUp(req.body, (err, data) => {
      console.log(req.body)
      if (err) {
        res.status(500)
        res.end()
      } else {
        res.status(201)
        res.json(data)
        res.end()
      }
    })
  },
  findProfile: (req, res) => {
    db.findSitter(req.query._id, (err, data) => {
      if (err || data.length === 0) {
        res.status(500)
        res.end(err)
      } else {
        res.status(200)
        res.json(data)
        res.end()
      }
    })
  },
  availabilityUpdate: (req, res) => {
    console.log(req.body._id)
    db.availabilityUpdate(req.body._id, (err, data) => {
      if (err) {
        res.status(500)
        res.end()
      } else {
        res.status(203)
        res.end('success')
      }
    })
  },
  searchSitter: async (req, res) => {
    let zip = Number(req.query.zip)
    console.log(zip)

    let findRadius = (lat1, lon1, radius) => {
      const earthRadius = 3958.8
      lat1 = Number(lat1)
      lon1 = Number(lon1)
      radius = Number(radius)
      function deg2rad(deg) {
        return deg * (Math.PI/180);
      }
      function rad2deg(rad) {
        return rad * (180/Math.PI);
      }
      const maxLat = lat1 + rad2deg(radius / earthRadius);
      const minLat = lat1 - rad2deg(radius / earthRadius);
      const maxLon = lon1 + rad2deg(radius / earthRadius / Math.cos(deg2rad(lat1)));
      const minLon = lon1 - rad2deg(radius / earthRadius / Math.cos(deg2rad(lat1)));
      console.log('check this out', maxLat, minLat, maxLon, minLon)
      return { maxLat, minLat, maxLon, minLon };
    }
    const options = {
      method: 'GET',
      url: 'https://community-zippopotamus.p.rapidapi.com/us/' + zip,
      headers: {
        'X-RapidAPI-Key': '31a778f717msh94e1b9c31e9490ap173107jsn5f1a5cacc670',
        'X-RapidAPI-Host': 'community-zippopotamus.p.rapidapi.com'
      }
    };
    axios.request(options)
      .then(function (response) {
        console.log(response.data)
        let rangeLatLon = findRadius(response.data.places[0].latitude, response.data.places[0].longitude, req.query.radius);
        console.log(rangeLatLon)
        db.findSitterAround(rangeLatLon, (err, data) => {
          if (err) {
            console.log(err)
            res.status(500)
            res.json(err)
            res.end()
          } else {
            res.json(data)
            res.status(200)
            res.end()
          }
        })

    }).catch(function (error) {
      console.log(error)
      res.send('cannot find zipcode')
      res.status(500)
      res.end()
    });
  }
}