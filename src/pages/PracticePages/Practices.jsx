import React from 'react';
import { Link } from 'react-router-dom';

const Practices = () => {
    return (
        <div className="container mx-auto p-6">
            <nav className="bg-white shadow-lg p-6 rounded-lg">
                {/* DPP Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-indigo-600">DPP'S (Daily Practice Problems)</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link 
                                to="/practice/alldpp" 
                                className="text-lg text-blue-500 hover:text-blue-700">
                                View All DPPs
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/practice/dpp/add" 
                                className="text-lg text-blue-500 hover:text-blue-700">
                                Add New DPP
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Important Questions Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-indigo-600">Important Questions</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link 
                                to="/practice/importantquestions/all" 
                                className="text-lg text-blue-500 hover:text-blue-700">
                                View All Important Questions
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/practice/importantquestions/add" 
                                className="text-lg text-blue-500 hover:text-blue-700">
                                Add New Important Questions
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Practices;
