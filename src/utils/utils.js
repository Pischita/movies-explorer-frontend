function translateDuration(n){
    if (n >= 60) {
      return `${Math.floor(n / 60)} ч   ${n % 60} м`;
    } else {
        return `${n} м`;
    }    
  }

export {translateDuration}