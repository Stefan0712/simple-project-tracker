export const getCurrentDay = () =>{
    const date = new Date();
    
    // Get the year
    const year = date.getFullYear();
    
    // Get the month as a short name
    const month = date.toLocaleString('en-US', { month: 'short' });
    
    // Get the day
    const day = date.getDate();
    
    // Format the hours and minutes to "24:00" format
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Combine them into the desired format
    return `${year} ${month} ${day} ${hours}:${minutes}`;
}



//used for converting status name to value
export const convertToSlug = (text) => {
    return text.replace(/\s+/g, '-').toLowerCase();
}



export const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}