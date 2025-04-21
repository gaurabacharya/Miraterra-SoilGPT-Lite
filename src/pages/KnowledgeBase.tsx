import React, { useState } from 'react';
import { Search, Book, Filter, ArrowRight } from 'lucide-react';
import { knowledgeBase } from '../data/knowledgeBase';

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  // All unique categories
  const categories = Array.from(
    new Set(knowledgeBase.map(item => item.category))
  );
  
  // Filter knowledge base items
  const filteredItems = knowledgeBase.filter(item => {
    const matchesSearch = searchQuery 
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Knowledge Base</h2>
        
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search soil and crop knowledge..."
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-1 px-1">
            <div className="flex items-center space-x-1">
              <Filter className="h-4 w-4 text-neutral-500" />
              <span className="text-sm text-neutral-600">Categories:</span>
            </div>
            <button
              onClick={() => setSelectedCategory('')}
              className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                selectedCategory === ''
                  ? 'bg-primary-100 text-primary-800'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm px-3 py-1 rounded-full whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Knowledge base content */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div 
                key={index}
                className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Book className="h-4 w-4 text-primary-600" />
                      <span className="text-xs font-medium text-primary-600">{item.category}</span>
                    </div>
                    <h3 className="font-medium text-neutral-800">{item.title}</h3>
                  </div>
                  <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      // Implementation for expanding/collapsing would go here
                    }}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
                <p className="mt-2 text-neutral-600 text-sm">
                  {item.content.substring(0, 180)}
                  {item.content.length > 180 ? '...' : ''}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-neutral-500 bg-neutral-50 rounded-lg">
              <p>No results found. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quick reference */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">Quick Reference Guide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-neutral-700 mb-3">Optimal Soil Parameters</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-2 font-medium text-neutral-600">Parameter</th>
                  <th className="text-left py-2 font-medium text-neutral-600">Optimal Range</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">pH</td>
                  <td className="py-2 text-neutral-700">6.0 - 7.0</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">Nitrogen (N)</td>
                  <td className="py-2 text-neutral-700">40 - 80 mg/kg</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">Phosphorus (P)</td>
                  <td className="py-2 text-neutral-700">25 - 50 mg/kg</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">Potassium (K)</td>
                  <td className="py-2 text-neutral-700">30 - 60 mg/kg</td>
                </tr>
                <tr>
                  <td className="py-2 text-neutral-700">Moisture</td>
                  <td className="py-2 text-neutral-700">20% - 60%</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h3 className="font-medium text-neutral-700 mb-3">Common Soil Amendments</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-2 font-medium text-neutral-600">Issue</th>
                  <th className="text-left py-2 font-medium text-neutral-600">Recommended Amendment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">Low pH (Acidic)</td>
                  <td className="py-2 text-neutral-700">Agricultural lime</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">High pH (Alkaline)</td>
                  <td className="py-2 text-neutral-700">Sulfur, peat moss</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">Low Nitrogen</td>
                  <td className="py-2 text-neutral-700">Compost, blood meal</td>
                </tr>
                <tr className="border-b border-neutral-100">
                  <td className="py-2 text-neutral-700">Low Phosphorus</td>
                  <td className="py-2 text-neutral-700">Bone meal, rock phosphate</td>
                </tr>
                <tr>
                  <td className="py-2 text-neutral-700">Low Potassium</td>
                  <td className="py-2 text-neutral-700">Wood ash, kelp meal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;