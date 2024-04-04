import React, { useState, useEffect } from 'react';
import Link from 'next/link';
interface Product {
    _id: number;
    name: string;
    departureTime: string;
    delayMinutes?: number;
    seatsAvailable: number;
    price: {
      sleeper: number;
      ac: number;
    };
  }
const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
      <button className="btn btn-ghost text-xl">daisyUI</button>
    </div>
  );
};

export default Navbar;
