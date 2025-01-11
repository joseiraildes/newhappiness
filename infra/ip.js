async function IpGeolotation(){
  try {
    const response = await fetch('https://api64.ipify.org/?format=json');
    const data = await response.json();
    
    return data
  } catch (error){
    console.error('Error:', error);
  }
}


module.exports = IpGeolotation