 export  function maskPhoneNumber(phone) {
   
  const phoneNumber = phone?.replace(/\D/g, ''); 
  const firstThreeDigits = phoneNumber?.slice(0, 3);
  const lastThreeDigits = phoneNumber?.slice(-3);
  const maskedDigits = phoneNumber?.slice(3, -3).replace(/\d/g, '*'); 

  return `+${firstThreeDigits}${maskedDigits}${lastThreeDigits}`;
  }
  
  export  function maskEmail(email) {
    const atIndex = email?.indexOf('@'); 
  
    const domain = email?.substring(atIndex); 
  
    const maskedUsername = email?.substring(0, atIndex - 3) + '***'; 
  
    return maskedUsername + domain;
  }