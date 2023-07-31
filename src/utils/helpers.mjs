export const extractSongDetailsFromQuery = (response) => {
    const songDetailsStart = response.indexOf('\n\n') + 2; // Find the starting index of song details
    const songDetailsEnd = response.lastIndexOf('\n\n'); // Find the ending index of song details
    
    const songDetailsString = response.slice(songDetailsStart, songDetailsEnd);
    const songDetails = JSON.parse(songDetailsString); // Parse the song details as JSON

    return songDetails;
    
}
