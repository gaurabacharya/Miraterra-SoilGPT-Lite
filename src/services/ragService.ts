import { knowledgeBase } from '../data/knowledgeBase';

// Types for soil data
interface SoilData {
  sampleId: string;
  N: number;
  P: number;
  K: number;
  pH: number;
  Moisture: number;
  [key: string]: number | string;
}

// Simulate analyzing soil data using RAG pipeline
export async function mockAnalyzeSoil(soilData: SoilData, query: string): Promise<string> {
  // In a real implementation, this would:
  // 1. Embed the query using OpenAI or other LLM
  // 2. Search the vector database using FAISS
  // 3. Generate a response with context using LangChain + LLM
  
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let response = '';
      
      // Add sample ID to all responses
      const sampleIdPrefix = `[Sample ID: ${soilData.sampleId}]\n\n`;
      
      // Simple keyword matching to simulate vector search
      if (lowerQuery.includes('tomato') || lowerQuery.includes('tomatoes')) {
        response = analyzeTomatoes(soilData);
      } else if (lowerQuery.includes('bean') || lowerQuery.includes('beans')) {
        response = analyzeBeans(soilData);
      } else if (lowerQuery.includes('carrot') || lowerQuery.includes('carrots')) {
        response = analyzeCarrots(soilData);
      } else if (lowerQuery.includes('amendment') || lowerQuery.includes('improve')) {
        response = suggestAmendments(soilData);
      } else if (lowerQuery.includes('moisture') || lowerQuery.includes('water')) {
        response = analyzeMoisture(soilData);
      } else if (lowerQuery.includes('nutrient') || lowerQuery.includes('fertilizer')) {
        response = analyzeNutrients(soilData);
      } else {
        response = generalSoilAnalysis(soilData);
      }
      
      resolve(sampleIdPrefix + response);
    }, 1500); // Simulate delay
  });
}

// Mock RAG responses based on soil data and specific queries
function analyzeTomatoes(soilData: SoilData): string {
  if (soilData.pH > 7.5) {
    return `The soil with pH ${soilData.pH} is too alkaline for optimal tomato growth. Tomatoes prefer slightly acidic to neutral soil with pH 6.0-6.8. Consider adding sulfur or peat moss to lower the pH gradually.

Nitrogen level (${soilData.N} mg/kg) is ${soilData.N < 40 ? 'low' : 'adequate'} for tomatoes. Phosphorus (${soilData.P} mg/kg) is ${soilData.P < 25 ? 'low' : 'adequate'}, and tomatoes need good phosphorus levels for flowering and fruiting. Potassium level (${soilData.K} mg/kg) is ${soilData.K < 30 ? 'low' : 'adequate'}.

Recommended amendments:
- Add elemental sulfur to lower pH
- ${soilData.P < 25 ? 'Apply bone meal or rock phosphate for phosphorus' : ''}
- ${soilData.K < 30 ? 'Add wood ash or a potassium-rich organic fertilizer' : ''}
- Add compost to improve overall soil structure`;
  } else if (soilData.pH < 5.5) {
    return `The soil with pH ${soilData.pH} is too acidic for tomatoes. Tomatoes prefer slightly acidic to neutral soil with pH 6.0-6.8. Add garden lime to raise the pH gradually.

Nitrogen level (${soilData.N} mg/kg) is ${soilData.N < 40 ? 'low' : 'adequate'} for tomatoes. Phosphorus (${soilData.P} mg/kg) is ${soilData.P < 25 ? 'low' : 'adequate'}, and tomatoes need good phosphorus levels for flowering and fruiting. Potassium level (${soilData.K} mg/kg) is ${soilData.K < 30 ? 'low' : 'adequate'}.

Recommended amendments:
- Add garden lime to raise pH
- ${soilData.N < 40 ? 'Apply nitrogen-rich compost or balanced organic fertilizer' : ''}
- ${soilData.P < 25 ? 'Add bone meal for phosphorus' : ''}
- ${soilData.K < 30 ? 'Use wood ash or a potassium-rich organic fertilizer' : ''}`;
  } else {
    return `This soil has a good pH (${soilData.pH}) for growing tomatoes, which prefer pH 6.0-6.8.

Nitrogen level (${soilData.N} mg/kg) is ${soilData.N < 40 ? 'low' : 'adequate'} for tomatoes. Phosphorus (${soilData.P} mg/kg) is ${soilData.P < 25 ? 'low' : 'adequate'}, and tomatoes need good phosphorus for fruiting. Potassium level (${soilData.K} mg/kg) is ${soilData.K < 30 ? 'low' : 'adequate'}.

Moisture level (${soilData.Moisture}%) is ${soilData.Moisture < 20 ? 'low' : soilData.Moisture > 60 ? 'high' : 'optimal'} for tomatoes.

Overall, this soil is ${soilData.P >= 25 && soilData.K >= 30 ? 'well-suited' : 'moderately suited'} for tomatoes with some minor amendments:
${soilData.N < 40 ? '- Add compost or balanced organic fertilizer for nitrogen\n' : ''}
${soilData.P < 25 ? '- Add bone meal for phosphorus to support fruiting\n' : ''}
${soilData.K < 30 ? '- Add wood ash or kelp meal for potassium\n' : ''}`;
  }
}

function analyzeBeans(soilData: SoilData): string {
  if (soilData.pH > 7.5) {
    return `The soil with pH ${soilData.pH} is too alkaline for optimal bean growth. Beans generally prefer slightly acidic to neutral soil with pH 6.0-7.0. Consider adding sulfur or peat moss to lower the pH gradually.

As legumes, beans can fix their own nitrogen from the air, so the current nitrogen level (${soilData.N} mg/kg) is less critical. Phosphorus (${soilData.P} mg/kg) is ${soilData.P < 25 ? 'low' : 'adequate'}, and beans need phosphorus for root development and pod production. Potassium level (${soilData.K} mg/kg) is ${soilData.K < 30 ? 'low' : 'adequate'}.

Recommended amendments:
- Add elemental sulfur to lower pH
- ${soilData.P < 25 ? 'Apply bone meal or rock phosphate for phosphorus' : ''}
- ${soilData.K < 30 ? 'Add wood ash or a potassium-rich organic fertilizer' : ''}
- Consider inoculating bean seeds with rhizobium bacteria to enhance nitrogen fixation`;
  } else {
    return `This soil has a ${soilData.pH < 6.0 ? 'slightly low' : 'good'} pH (${soilData.pH}) for growing beans, which prefer pH 6.0-7.0.

As legumes, beans can fix their own nitrogen from the air through symbiotic bacteria in their root nodules, so the current nitrogen level (${soilData.N} mg/kg) is less critical. Phosphorus (${soilData.P} mg/kg) is ${soilData.P < 25 ? 'low' : 'adequate'}, and beans need phosphorus for good root development and pod production. Potassium level (${soilData.K} mg/kg) is ${soilData.K < 30 ? 'low' : 'adequate'}.

Moisture level (${soilData.Moisture}%) is ${soilData.Moisture < 20 ? 'low' : soilData.Moisture > 60 ? 'high' : 'optimal'} for beans.

Overall, this soil is ${soilData.pH >= 6.0 && soilData.pH <= 7.0 && soilData.P >= 25 ? 'well-suited' : 'moderately suited'} for beans with some minor amendments:
${soilData.pH < 6.0 ? '- Add a small amount of garden lime to raise pH slightly\n' : ''}
${soilData.P < 25 ? '- Add bone meal for phosphorus\n' : ''}
${soilData.K < 30 ? '- Add wood ash or kelp meal for potassium\n' : ''}
- Consider inoculating bean seeds with rhizobium bacteria to enhance nitrogen fixation`;
  }
}

function analyzeCarrots(soilData: SoilData): string {
  if (soilData.pH < 5.5 || soilData.pH > 7.5) {
    return `The soil pH of ${soilData.pH} is ${soilData.pH < 5.5 ? 'too acidic' : 'too alkaline'} for optimal carrot growth. Carrots prefer soil with pH 6.0-7.0. ${soilData.pH < 5.5 ? 'Add garden lime to raise' : 'Add sulfur to lower'} the pH gradually.

Carrots don't require high nitrogen levels, so the current level (${soilData.N} mg/kg) is ${soilData.N > 60 ? 'actually a bit high, which can cause forked roots' : 'fine'}. Phosphorus (${soilData.P} mg/kg) is ${soilData.P < 25 ? 'low' : 'adequate'}, and potassium level (${soilData.K} mg/kg) is ${soilData.K < 30 ? 'low' : 'adequate'}.

Soil texture is also important for carrots - they need loose, well-drained soil to develop straight roots.

Recommended amendments:
- ${soilData.pH < 5.5 ? 'Add garden lime to raise pH' : 'Add sulfur to lower pH'}
- ${soilData.N > 60 ? 'Avoid adding nitrogen-rich fertilizers' : ''}
- ${soilData.P < 25 ? 'Add bone meal for phosphorus' : ''}
- ${soilData.K < 30 ? 'Add wood ash for potassium' : ''}
- Add well-rotted compost to improve soil structure`;
  } else {
    return `This soil has a good pH (${soilData.pH}) for growing carrots, which prefer pH 6.0-7.0.

Carrots don't require high nitrogen levels, so the current level (${soilData.N} mg/kg) is ${soilData.N > 60 ? 'actually a bit high, which can cause forked roots' : 'fine'}. Phosphorus (${soilData.P} mg/kg) is ${soilData.P < 25 ? 'low' : 'adequate'}, and potassium level (${soilData.K} mg/kg) is ${soilData.K < 30 ? 'low' : 'adequate'}.

Moisture level (${soilData.Moisture}%) is ${soilData.Moisture < 20 ? 'low' : soilData.Moisture > 60 ? 'high and may cause rot' : 'optimal'} for carrots.

Soil texture is also important for carrots - they need loose, well-drained soil to develop straight roots.

Overall, this soil is ${soilData.P >= 25 && soilData.K >= 30 && soilData.N <= 60 ? 'well-suited' : 'moderately suited'} for carrots with some amendments:
${soilData.N > 60 ? '- Avoid adding nitrogen-rich fertilizers\n' : ''}
${soilData.P < 25 ? '- Add bone meal for phosphorus\n' : ''}
${soilData.K < 30 ? '- Add wood ash for potassium\n' : ''}
- Add well-rotted compost to improve soil structure and ensure it's loose for straight root growth`;
  }
}

function suggestAmendments(soilData: SoilData): string {
  let amendments = [];
  
  // pH amendments
  if (soilData.pH < 6.0) {
    amendments.push('Garden lime or wood ash to raise pH');
  } else if (soilData.pH > 7.5) {
    amendments.push('Elemental sulfur or peat moss to lower pH');
  }
  
  // Nutrient amendments
  if (soilData.N < 40) {
    amendments.push('Compost, well-rotted manure, or blood meal for nitrogen');
  }
  
  if (soilData.P < 25) {
    amendments.push('Bone meal or rock phosphate for phosphorus');
  }
  
  if (soilData.K < 30) {
    amendments.push('Wood ash, kelp meal, or greensand for potassium');
  }
  
  // Moisture amendments
  if (soilData.Moisture < 20) {
    amendments.push('Compost or well-rotted manure to improve water retention');
  } else if (soilData.Moisture > 60) {
    amendments.push('Coarse sand or perlite to improve drainage');
  }
  
  // Structure improvements
  amendments.push('Cover crops during off-season to build soil structure and prevent erosion');
  
  return `Based on your soil analysis, here are recommended amendments to improve soil health:

pH: ${soilData.pH} (${soilData.pH < 6.0 ? 'Acidic' : soilData.pH > 7.5 ? 'Alkaline' : 'Neutral'})
Nitrogen: ${soilData.N} mg/kg (${soilData.N < 40 ? 'Low' : 'Adequate'})
Phosphorus: ${soilData.P} mg/kg (${soilData.P < 25 ? 'Low' : 'Adequate'})
Potassium: ${soilData.K} mg/kg (${soilData.K < 30 ? 'Low' : 'Adequate'})
Moisture: ${soilData.Moisture}% (${soilData.Moisture < 20 ? 'Low' : soilData.Moisture > 60 ? 'High' : 'Optimal'})

Recommended amendments:
${amendments.map(a => `- ${a}`).join('\n')}

Application timing:
- pH amendments: Apply in fall for winter breakdown
- Nutrient amendments: Apply 2-4 weeks before planting
- Structural amendments: Incorporate anytime soil is being worked

Retest soil after one growing season to track improvements.`;
}

function analyzeMoisture(soilData: SoilData): string {
  if (soilData.Moisture < 20) {
    return `Your soil's moisture level (${soilData.Moisture}%) is low. Here are strategies to improve moisture retention:

1. Add organic matter:
   - Compost (3-4 inch layer worked into topsoil)
   - Well-rotted manure
   - Leaf mold

2. Use mulch to reduce evaporation:
   - Straw
   - Wood chips (3-4 inch layer)
   - Leaf litter

3. Consider soil structure:
   - If sandy, add clay and organic matter
   - Use cover crops during off-season
   - Avoid excessive tilling

4. Irrigation strategies:
   - Drip irrigation for efficient water delivery
   - Water deeply but less frequently
   - Water in early morning or evening

Your soil's pH of ${soilData.pH} also affects water retention. ${soilData.pH > 7.0 ? 'Slightly alkaline soils may benefit from adding organic matter to improve structure and water retention.' : ''}`;
  } else if (soilData.Moisture > 60) {
    return `Your soil's moisture level (${soilData.Moisture}%) is high, which may cause drainage issues. Here are strategies to improve drainage:

1. Improve soil structure:
   - Add coarse sand
   - Add perlite or vermiculite
   - Avoid compaction

2. Create raised beds:
   - Elevate planting areas 6-12 inches
   - Incorporate good drainage material in raised bed soil

3. Install drainage:
   - French drains for severe cases
   - Swales to direct water away from garden areas

4. Plant selection:
   - Choose plants that tolerate wet conditions
   - Consider water-loving crops for low-lying areas

Your soil's pH of ${soilData.pH} ${soilData.pH < 6.0 ? 'is acidic, which is typical of poorly drained soils. Improving drainage may naturally help balance pH over time.' : 'should be monitored as you improve drainage.'}`;
  } else {
    return `Your soil's moisture level (${soilData.Moisture}%) is within the optimal range for most crops. To maintain this balance:

1. Continue good practices:
   - Regular addition of organic matter
   - Use of appropriate mulch
   - Balanced irrigation

2. Monitor seasonal changes:
   - Adjust watering during dry or wet periods
   - Check moisture at 2-inch depth before watering
   - Water deeply when needed rather than frequent shallow watering

3. Maintain soil structure:
   - Minimize compaction
   - Use cover crops in off-season
   - Practice conservation tillage

Your soil's pH of ${soilData.pH} and nutrient levels (N: ${soilData.N}, P: ${soilData.P}, K: ${soilData.K}) are working well with your current moisture level. Continue regular soil testing to maintain this balance.`;
  }
}

function analyzeNutrients(soilData: SoilData): string {
  return `Nutrient Analysis of Your Soil:

Nitrogen (N): ${soilData.N} mg/kg - ${soilData.N < 20 ? 'Very Low' : soilData.N < 40 ? 'Low' : soilData.N < 80 ? 'Adequate' : 'High'}
Phosphorus (P): ${soilData.P} mg/kg - ${soilData.P < 10 ? 'Very Low' : soilData.P < 25 ? 'Low' : soilData.P < 50 ? 'Adequate' : 'High'}
Potassium (K): ${soilData.K} mg/kg - ${soilData.K < 15 ? 'Very Low' : soilData.K < 30 ? 'Low' : soilData.K < 60 ? 'Adequate' : 'High'}

pH: ${soilData.pH} (${soilData.pH < 5.5 ? 'Strongly Acidic' : soilData.pH < 6.5 ? 'Moderately Acidic' : soilData.pH < 7.5 ? 'Neutral' : 'Alkaline'})
Note: pH affects nutrient availability. ${soilData.pH < 6.0 || soilData.pH > 7.5 ? 'Your current pH may limit the availability of some nutrients.' : 'Your pH is in a good range for nutrient availability.'}

Recommended organic fertilizers based on your analysis:

${soilData.N < 40 ? `For Nitrogen:
- Blood meal (13-0-0)
- Composted manure (1-1-1)
- Alfalfa meal (2.5-0.5-2.5)
` : ''}

${soilData.P < 25 ? `For Phosphorus:
- Bone meal (3-15-0)
- Rock phosphate (0-3-0)
- Fish meal (6-6-0)
` : ''}

${soilData.K < 30 ? `For Potassium:
- Wood ash (0-1-3)
- Kelp meal (1-0-2)
- Greensand (0-0-3)
` : ''}

Application rates:
${soilData.N < 20 ? '- Heavy nitrogen feeding (10-20 lbs per 1,000 sq ft of high-nitrogen amendment)\n' : 
  soilData.N < 40 ? '- Moderate nitrogen feeding (5-10 lbs per 1,000 sq ft of nitrogen amendment)\n' : ''}
${soilData.P < 10 ? '- Heavy phosphorus feeding (10-20 lbs per 1,000 sq ft of bone meal)\n' : 
  soilData.P < 25 ? '- Moderate phosphorus feeding (5-10 lbs per 1,000 sq ft of bone meal)\n' : ''}
${soilData.K < 15 ? '- Heavy potassium feeding (10-20 lbs per 1,000 sq ft of wood ash or kelp)\n' : 
  soilData.K < 30 ? '- Moderate potassium feeding (5-10 lbs per 1,000 sq ft of wood ash or kelp)\n' : ''}

For balanced improvement, consider a high-quality compost application (2-3 inch layer) worked into the top 6 inches of soil.`;
}

function generalSoilAnalysis(soilData: SoilData): string {
  return `General Soil Analysis:

pH: ${soilData.pH} (${
    soilData.pH < 5.5 ? 'Strongly Acidic' : 
    soilData.pH < 6.5 ? 'Moderately Acidic' : 
    soilData.pH < 7.5 ? 'Neutral' : 'Alkaline'
  })
Nitrogen (N): ${soilData.N} mg/kg (${soilData.N < 40 ? 'Low' : 'Adequate'})
Phosphorus (P): ${soilData.P} mg/kg (${soilData.P < 25 ? 'Low' : 'Adequate'})
Potassium (K): ${soilData.K} mg/kg (${soilData.K < 30 ? 'Low' : 'Adequate'})
Moisture: ${soilData.Moisture}% (${
    soilData.Moisture < 20 ? 'Low' : 
    soilData.Moisture > 60 ? 'High' : 'Optimal'
  })

Crop Suitability:
- ${soilData.pH >= 6.0 && soilData.pH <= 7.0 ? 'Good pH for most common vegetables' : 'pH needs adjustment for optimal crop growth'}
- ${soilData.N >= 40 && soilData.P >= 25 && soilData.K >= 30 ? 'Balanced nutrients for general gardening' : 'Some nutrient supplementation recommended'}
- ${soilData.Moisture >= 20 && soilData.Moisture <= 60 ? 'Good moisture level for most crops' : 'Moisture management needed'}

Well-suited crops for this soil profile:
${soilData.pH < 6.5 ? '- Acid-loving plants: potatoes, blueberries, strawberries' : ''}
${soilData.pH > 6.5 ? '- Alkaline-tolerant plants: brassicas, asparagus, beans' : ''}
${soilData.N < 40 ? '- Legumes: beans, peas (which can fix their own nitrogen)' : ''}
${soilData.N >= 40 ? '- Leafy greens: lettuce, spinach, kale' : ''}

Soil improvement recommendations:
${soilData.pH < 6.0 ? '- Add lime to raise pH\n' : ''}
${soilData.pH > 7.5 ? '- Add sulfur to lower pH\n' : ''}
${soilData.N < 40 ? '- Add nitrogen-rich amendments (compost, manure)\n' : ''}
${soilData.P < 25 ? '- Add phosphorus (bone meal, rock phosphate)\n' : ''}
${soilData.K < 30 ? '- Add potassium (wood ash, kelp meal)\n' : ''}
${soilData.Moisture < 20 ? '- Improve water retention with organic matter\n' : ''}
${soilData.Moisture > 60 ? '- Improve drainage with coarse materials\n' : ''}

For a more specific recommendation, please ask about particular crops or soil health concerns.`;
}

// Simulate retrieving knowledge base entries
export function searchKnowledgeBase(query: string): any[] {
  // In a real implementation, this would use vector similarity search
  const normalizedQuery = query.toLowerCase();
  
  return knowledgeBase.filter(entry => {
    return (
      entry.title.toLowerCase().includes(normalizedQuery) ||
      entry.content.toLowerCase().includes(normalizedQuery) ||
      entry.keywords.some(keyword => normalizedQuery.includes(keyword))
    );
  });
}