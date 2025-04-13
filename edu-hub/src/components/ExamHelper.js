// frontend/src/components/ExamHelper.js

const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysisResults(null);
    setAnalysisError(null);
  
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);  // Keep appending each file
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/analysis/analyze', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Analysis failed:', errorData);
        setAnalysisError(errorData.error || 'Analysis failed.');
        return;
      }
  
      const data = await response.json();
      setAnalysisResults(data);
    } catch (error) {
      console.error('Error sending files:', error);
      setAnalysisError('Failed to connect to the server.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  