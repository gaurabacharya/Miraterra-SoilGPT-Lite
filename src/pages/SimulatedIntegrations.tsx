import React, { useState } from 'react';
import { Terminal, MessageSquare, Ticket, PlayCircle, Copy, Check } from 'lucide-react';
import { cn } from '../utils/utils';

const SimulatedIntegrations: React.FC = () => {
  const [cliCommand, setCliCommand] = useState('');
  const [cliOutput, setCliOutput] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [jiraTitle, setJiraTitle] = useState('');
  const [jiraDescription, setJiraDescription] = useState('');
  const [jiraTickets, setJiraTickets] = useState<{id: string; title: string; status: string; created: string}[]>([]);
  const [activeTab, setActiveTab] = useState<'slack' | 'jira'>('slack');
  const [copied, setCopied] = useState(false);

  // Example CLI commands
  const exampleCommands = [
    'soilgpt "Is this soil suitable for growing tomatoes?"',
    'soilgpt "What amendments should I add for better potato yield?"',
    'soilgpt "How can I improve soil moisture retention?"',
  ];

  // Handle CLI command submission
  const handleCliSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cliCommand.trim()) return;
    
    setIsProcessing(true);
    
    // Log the command
    setCliOutput(prev => [
      ...prev,
      `$ ${cliCommand}`,
    ]);
    
    // Simulate processing
    setTimeout(() => {
      let response = '';
      
      if (cliCommand.toLowerCase().includes('tomato')) {
        response = 'The soil data indicates a pH of 8.2, which is too alkaline for optimal tomato growth. Tomatoes prefer slightly acidic soil (pH 6.0-6.8). Consider adding sulfur or peat moss to lower the pH. The nitrogen level is adequate, but phosphorus is low. Add bone meal to increase phosphorus for better fruit production.';
      } else if (cliCommand.toLowerCase().includes('potato')) {
        response = 'For better potato yield, the soil needs more potassium and phosphorus. The current N:P:K ratio shows potassium is adequate but phosphorus is deficient. Add rock phosphate or bone meal to improve phosphorus levels. Also, potatoes prefer slightly acidic soil (pH 5.8-6.5), so the current pH of 8.2 is too high. Consider adding elemental sulfur to lower pH.';
      } else if (cliCommand.toLowerCase().includes('moisture')) {
        response = 'To improve soil moisture retention, add organic matter such as compost, well-rotted manure, or leaf mold. These materials improve soil structure and water-holding capacity. For clay-heavy soils, adding organic matter also improves drainage while retaining moisture. Consider mulching with straw or wood chips to reduce evaporation from the soil surface.';
      } else {
        response = 'Analyzing soil data for your query... Based on the NPK values, pH, and moisture content, I recommend balancing nutrients with appropriate amendments and considering crop rotation to maintain soil health. For more specific recommendations, please provide details about your target crops.';
      }
      
      // Add Jira ticket info if relevant
      if (cliCommand.toLowerCase().includes('tomato') || cliCommand.toLowerCase().includes('potato')) {
        response += '\n\nLOG: [Jira] Create Task: Amend soil pH and add nutrients for better crop production';
      }
      
      setCliOutput(prev => [...prev, response]);
      setCliCommand('');
      setIsProcessing(false);
    }, 1500);
  };

  // Handle Jira ticket creation
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jiraTitle.trim()) return;
    
    const ticketId = 'SOIL-' + Math.floor(100 + Math.random() * 900);
    
    setJiraTickets(prev => [
      {
        id: ticketId,
        title: jiraTitle,
        status: 'Open',
        created: new Date().toLocaleDateString(),
      },
      ...prev,
    ]);
    
    setJiraTitle('');
    setJiraDescription('');
  };

  // Copy example command to input
  const handleCopyCommand = (command: string) => {
    setCliCommand(command);
  };

  // Copy command for sharing
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(`$ ${cliCommand}\n\n${cliOutput[cliOutput.length - 1] || ''}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
        <div className="flex border-b border-neutral-200">
          <button
            onClick={() => setActiveTab('slack')}
            className={cn(
              "flex items-center space-x-2 px-4 py-3 font-medium text-sm transition-colors",
              activeTab === 'slack'
                ? "border-b-2 border-primary-600 text-primary-700"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
            )}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Simulated Slack CLI</span>
          </button>
          <button
            onClick={() => setActiveTab('jira')}
            className={cn(
              "flex items-center space-x-2 px-4 py-3 font-medium text-sm transition-colors",
              activeTab === 'jira'
                ? "border-b-2 border-primary-600 text-primary-700"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
            )}
          >
            <Ticket className="h-4 w-4" />
            <span>Simulated Jira Ticketing</span>
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'slack' ? (
            <div>
              <h2 className="text-lg font-semibold text-neutral-800 mb-4">Simulated Slack CLI</h2>
              <p className="text-neutral-600 mb-6">
                This interface simulates how SoilGPT would work as a Slack bot integration, allowing users to query soil data directly from Slack.
              </p>
              
              {/* Example commands */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-neutral-600 mb-2">Example Commands:</h3>
                <div className="space-y-2">
                  {exampleCommands.map((command, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between bg-neutral-50 rounded-md p-2 hover:bg-neutral-100 cursor-pointer"
                      onClick={() => handleCopyCommand(command)}
                    >
                      <code className="text-sm text-neutral-700">{command}</code>
                      <button className="text-neutral-500 hover:text-primary-600">
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CLI terminal */}
              <div className="bg-neutral-900 rounded-lg overflow-hidden">
                <div className="bg-neutral-800 px-4 py-2 flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-neutral-400" />
                  <span className="text-neutral-300 text-sm font-medium">SoilGPT CLI</span>
                </div>
                <div className="p-4 font-mono text-sm h-64 overflow-y-auto">
                  {cliOutput.map((line, index) => (
                    <div 
                      key={index} 
                      className={`mb-2 whitespace-pre-line ${
                        line.startsWith('$') ? 'text-neutral-400' : 'text-green-400'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="text-yellow-400 flex items-center space-x-2">
                      <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span>Processing query...</span>
                    </div>
                  )}
                </div>
                
                {/* CLI input */}
                <form onSubmit={handleCliSubmit} className="border-t border-neutral-700 p-2">
                  <div className="flex items-center">
                    <span className="text-neutral-400 mr-2">$</span>
                    <input
                      type="text"
                      value={cliCommand}
                      onChange={(e) => setCliCommand(e.target.value)}
                      placeholder="Enter a soilgpt command..."
                      className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-sm"
                      disabled={isProcessing}
                    />
                    <button
                      type="submit"
                      disabled={isProcessing || !cliCommand.trim()}
                      className="ml-2 text-neutral-400 hover:text-green-400 disabled:opacity-50"
                    >
                      <PlayCircle className="h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Share output */}
              {cliOutput.length > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleCopyToClipboard}
                    className="flex items-center space-x-1 text-sm text-neutral-600 hover:text-primary-600"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy output</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-neutral-800 mb-4">Simulated Jira Ticketing</h2>
              <p className="text-neutral-600 mb-6">
                This interface simulates creating tickets for soil amendment actions, similar to how SoilGPT would integrate with Jira for task management.
              </p>
              
              {/* Create ticket form */}
              <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-medium text-neutral-700 mb-3">Create New Ticket</h3>
                <form onSubmit={handleCreateTicket}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-1">
                        Ticket Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={jiraTitle}
                        onChange={(e) => setJiraTitle(e.target.value)}
                        placeholder="E.g., Amend soil pH for tomato growth"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-neutral-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={jiraDescription}
                        onChange={(e) => setJiraDescription(e.target.value)}
                        placeholder="Detailed description of the required actions..."
                        rows={3}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={!jiraTitle.trim()}
                      className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                      Create Ticket
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Ticket list */}
              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">Tickets</h3>
                {jiraTickets.length > 0 ? (
                  <div className="space-y-3">
                    {jiraTickets.map((ticket, index) => (
                      <div 
                        key={index}
                        className="border border-neutral-200 rounded-md p-4 hover:bg-neutral-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                                {ticket.id}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded ${
                                ticket.status === 'Open'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-neutral-100 text-neutral-800'
                              }`}>
                                {ticket.status}
                              </span>
                            </div>
                            <h4 className="font-medium text-neutral-800">{ticket.title}</h4>
                          </div>
                          <span className="text-xs text-neutral-500">
                            Created: {ticket.created}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral-500 bg-neutral-50 rounded-lg">
                    <p>No tickets created yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* How it works */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-800 mb-4">How the Integrations Work</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-neutral-700 mb-2">Slack CLI Integration</h3>
            <p className="text-neutral-600 text-sm">
              In a production environment, SoilGPT would integrate with Slack using their Bot API. 
              Users would be able to @mention the bot with questions about soil data, and the 
              bot would respond with analysis and recommendations. The simulated CLI above 
              demonstrates this interaction pattern.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-neutral-700 mb-2">Jira Ticketing System</h3>
            <p className="text-neutral-600 text-sm">
              When SoilGPT identifies actions that need to be taken (like soil amendments), 
              it can automatically create tickets in Jira using their REST API. These tickets 
              would be assigned to appropriate team members and tracked through to completion. 
              The simulation above demonstrates how users could also manually create tickets 
              based on SoilGPT recommendations.
            </p>
          </div>
          
          <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 mt-4">
            <h3 className="font-medium text-neutral-700 mb-2">Implementation Notes</h3>
            <p className="text-neutral-600 text-sm">
              In a real-world implementation, these integrations would require:
            </p>
            <ul className="list-disc list-inside text-sm text-neutral-600 mt-2 space-y-1">
              <li>OAuth authentication with the respective services</li>
              <li>Webhook endpoints for real-time event handling</li>
              <li>Proper error handling and retry mechanisms</li>
              <li>User permission management across services</li>
              <li>Rate limiting compliance for API calls</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatedIntegrations;