import React, { useState, useEffect } from 'react';
import { askDoubtService } from '../services/askDoubtService';
import AskQuestion from '../components/AskDoubt/AskQuestion';
import levenshtein from 'js-levenshtein';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

const AskDoubtPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(5); 
    const navigate = useNavigate(); // Correctly call navigate as a function

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const result = await askDoubtService.listQuestions();
                console.log(result)
                setQuestions(result.documents);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();

        // Apply spell correction using Levenshtein distance
        const correctedQuestions = questions.filter((question) => {
            const distance = levenshtein(question.QuestionText.toLowerCase(), searchQuery.toLowerCase());
            return distance <= 5; // Adjust threshold for how strict the match should be
        });

        if (correctedQuestions.length > 0) {
            setQuestions(correctedQuestions);
        } else {
            alert('No matching questions found.');
        }
    };

    const handleQuestionClick = (questionId) => {
        // Correctly invoke the navigate function
        navigate(`/askdoubt/questions/${questionId}`);
    };

    // Pagination logic
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center mb-6">Ask a Doubt</h2>

            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col items-center">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border border-gray-300 p-2 w-full sm:w-1/2 rounded-md shadow-md focus:outline-none focus:border-indigo-500"
                    placeholder="Search questions..."
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Search
                </button>
            </form>

        
            <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-4">Available Questions</h3>
                <ul className="space-y-4">
                    {currentQuestions.map((question) => (
                        <li key={question.$id}>
                            <h3 
                                onClick={() => handleQuestionClick(question.$id)}
                                className="cursor-pointer text-blue-600 hover:underline" 
                            >
                                {question.QuestionText}
                            </h3>
                            <small>Asked by: {question.AskedBy}</small>
                        </li>
                    ))}
                </ul>

                <Pagination
                    questionsPerPage={questionsPerPage}
                    totalQuestions={questions.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>

            {/* Ask a New Question */}
            <div className="mt-10">
                <AskQuestion />
            </div>
        </div>
    );
};

export default AskDoubtPage;
