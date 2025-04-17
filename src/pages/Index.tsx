import React from "react";
import Navbar from "@/components/Navbar";
import Wizard from "@/components/wizard/Wizard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-mobility-dark">Urban Sustainable Mobility</h1>
            <p className="mt-2 text-lg text-gray-600">
              Advanced analytics platform for urban mobility optimization
            </p>
          </div>
          
          <Wizard />
        </div>
      </main>
      
      <footer className="bg-white border-t border-mobility-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 md:mb-0">
              © 2025 Urban Mobility Platform. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-mobility-dark hover:text-mobility-red">Privacy Policy</a>
              <a href="#" className="text-sm text-mobility-dark hover:text-mobility-red">Terms of Service</a>
              <a href="#" className="text-sm text-mobility-dark hover:text-mobility-red">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
