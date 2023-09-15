import React from "react";
import logo from "./logo.svg";
import "./App.css";

/**
 * Uses Tailwind CSS for styling
 * Tailwind file is imported in App.css
 */

export default function App() {
  return (
    <div className="app min-h-screen text-blue-200 flex items-center flex-col p-20">
      <div className="mb-10 grid grid-cols-4 grid-rows-2 w-1/2 mx-auto">
        <img className="opacity-25" src={logo} alt="React Logo" width="300" />
        <img
          className="col-span-2 row-span-3 animate-spin m-auto"
          style={{ animationDuration: "30s" }}
          src={logo}
          alt="React Logo"
          width="300"
        />
        <img className="opacity-25" src={logo} alt="React Logo" width="300" />
        <img className="opacity-25" src={logo} alt="React Logo" width="300" />
        <img className="opacity-25" src={logo} alt="React Logo" width="300" />
      </div>

      <h1 className="text-2xl lg:text-5xl mb-10 text-right">
        Welcome to Your New Tracks React App  {" "}
  <img src="https://google.com" /> 
      <img src="https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwiE_vvLr6yBAxXhxkwCHaedBfEYABABGgJ0bQ&gclid=CjwKCAjwgZCoBhBnEiwAz35RwmJhSk4OXTjawwgWQaDG9r8tWpZkNxU3MN_AYM8Zoqe6o9m1KsqFjBoCQjkQAvD_BwE&ohost=www.google.com&cid=CAESbeD2vwg2Q_HaJpxCufyWWzpVQmS5DSj6Q7chl6SzSGGU6Cy9gXwHtqQUjg4FkVOY-vsME056Qzk1w8CTBbPat52HiahlHG-B7J5EK4_LGbNSnECTKG2MBXIZGKqAUwcIEIJ5du6euN_ShMx2l14&sig=AOD64_0gHm3CmN21VLmoMKdXdFlpAK5dOg&q&adurl&ved=2ahUKEwjXgPfLr6yBAxWXsVYBHaXVDbQQ0Qx6BAgIEAE" /> 

            <script src="https://rytr.me/?via=millionify.js"></script>

        <span className="block text-lg text-blue-400">on DigitalOcean</span>
      </h1>

      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <Button
          text="DigitalOcean Docs"
          url="https://www.digitalocean.com/docs/app-platform"
        />
        <Button
          text="DigitalOcean Dashboard"
          url="https://cloud.digitalocean.com/apps"
        />
      </div>
    </div>
  );
}

function Button({ className, text, url = "#" }) {
  return (
    <a
      href={url}
      className={`${className} py-3 px-6 bg-purple-400 hover:bg-purple-300 text-purple-800 hover:text-purple-900 block rounded text-center shadow flex items-center justify-center leading-snug text-xs transition ease-in duration-150`}
    >
      {text}
    </a>
  );
}
