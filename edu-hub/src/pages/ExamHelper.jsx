// import React, { useState } from 'react';

// function ExamHelper() {
//   const [analysisResults, setAnalysisResults] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileUpload = async (event) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       setLoading(true);
//       setError(null);
//       setAnalysisResults(null); // Clear previous results

//       const formData = new FormData();
//       for (let i = 0; i < files.length; i++) {
//         formData.append('files', files[i]);
//       }

//       try {
//         const response = await fetch('http://localhost:5000/api/analysis/analyze', {
//           method: 'POST',
//           body: formData,
//         });

//         if (!response.ok) {
//           let errorMessage = `Failed to analyze files (Status: ${response.status})`;
//           try {
//             const errorData = await response.json();
//             if (errorData && errorData.error) {
//               errorMessage += `: ${errorData.error}`;
//             }
//           } catch (e) {
//             // If parsing JSON error fails, just use the status text
//           }
//           setError(errorMessage);
//         } else {
//           const data = await response.json();
//           console.log('Analysis Response:', data);
//           if (data && data.results && Array.isArray(data.results)) {
//             setAnalysisResults(data.results);
//           } else {
//             setError('Received an unexpected response format from the backend.');
//           }
//         }
//       } catch (err) {
//         setError(`Error sending files: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Exam Paper Analyzer</h1>
//       <input type="file" multiple onChange={handleFileUpload} />

//       {loading && <p>Analyzing files... Please wait.</p>}

//       {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//       {analysisResults && Array.isArray(analysisResults) && analysisResults.length > 0 && (
//         <div>
//           <h2>Analysis Results:</h2>
//           {analysisResults.map((result, index) => (
//             <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
//               <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
//             </div>
//           ))}
//         </div>
//       )}

//       {analysisResults && Array.isArray(analysisResults) && analysisResults.length === 0 && (
//         <p>No analysis results were returned.</p>
//       )}
//     </div>
//   );
// }

// export default ExamHelper;

import React, { useState } from 'react';

function ExamHelper() {
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setLoading(true);
      setError(null);
      setAnalysisResults(null); // Clear previous results

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      try {
        const response = await fetch('https://edu-hub-cg1z.onrender.com/api/analysis/analyze', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          let errorMessage = `Failed to analyze files (Status: ${response.status})`;
          try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
              errorMessage += `: ${errorData.error}`;
            }
          } catch (e) {
            // If parsing JSON error fails, just use the status text
          }
          setError(errorMessage);
        } else {
          const data = await response.json();
          console.log('Analysis Response:', data);
          if (data && data.results && Array.isArray(data.results)) {
            setAnalysisResults(data.results);
          } else {
            setError('Received an unexpected response format from the backend.');
          }
        }
      } catch (err) {
        setError(`Error sending files: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Exam Paper Analyzer</h1>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileInput">
          Upload Exam Papers
        </label>
        <input
          id="fileInput"
          type="file"
          multiple
          onChange={handleFileUpload}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {loading && <p className="text-blue-500 italic">Analyzing files... Please wait.</p>}

      {error && <p className="text-red-500">Error: {error}</p>}

      {analysisResults && Array.isArray(analysisResults) && analysisResults.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Analysis Results:</h2>
          {analysisResults.map((result, index) => (
            <div
              key={index}
              className="bg-gray-100 border border-gray-300 rounded-md p-4 mb-4"
            >
              <pre className="whitespace-pre-wrap font-mono text-sm">{result}</pre>
            </div>
          ))}
        </div>
      )}

      {analysisResults && Array.isArray(analysisResults) && analysisResults.length === 0 && (
        <p className="text-gray-600 italic">No analysis results were returned.</p>
      )}
    </div>
  );
}

export default ExamHelper;