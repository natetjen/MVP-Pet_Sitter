<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />


# MVP-Pet_Sitter

**PetSitter Finder**
PetSitter Finder is a website designed to connect pet owners with willing pet sitters. The website allows users to sign up and create an account, set their availability status, and list their pets' information, including name, breed, age, weight, and pictures. Additionally, the website requires users to fill in their zipcode field, allowing for automatic location stamping on their account.

The website uses a third-party API to retrieve the city, county, longitude, and latitude of the user's location. Users can view their pets' information under the pet list and update their availability to pet sit. There is also an option to search for pet owners and pet sitters who are available to help within a specified radius of the user's location.

Pet owners and pet sitters available to help are listed under the "petsitter-list." The list displays their name, picture, and place of residence. Clicking on a pet sitter's name will expand their information to include email, phone number, and their list of pets.

Currently, the website is still under construction, and features such as messaging, requesting, posting for help, and rating, recommendation, and testimony for pet sitters and pet owners are yet to be added.

## **Technologies Used**
- REACT <i class="fab fa-react"></i>
- Express
- Node
- MongoDB
- Firebase Aut

## **How to Use the Website**
1. Sign up and create an account by filling in the required information, including your pets' details and location.
2. Set your availability status to pet sit.
3. Search for pet owners and pet sitters who are available to help within a specified radius of your location.
4. Contact pet sitters or pet owners available to help through email or phone number.

## **Future Features**
1. Messaging Feature
2. Requesting Feature (select which pet and send a request to the 'available' pet sitter)
3. Help Post Page (a page where you can post that you need help, and an available pet sitter can pick it up)
4. Pet sitter and pet owner rating, recommendation, and testimony.

## **Contributing**
Contributions are welcome! Please create an issue to discuss your proposed changes before submitting a pull request.

## **Getting Started**
1. clone the repository
   - git clone https://github.com/natetjen/MVP-Pet_Sitter.git
2. Install the required packages
   - cd MVP-Pet_Sitter
   - npm install
3. Set up environment by creating .env
  - sudo nano .env
4. Enter your port in the .env
   - PORT = <whatever port you want>
   - e.g(PORT=3000)
5. npm start
6. Visit http://localhost:<whatever port you enter> in your web browser
