export default class CountryParser {
   
    static characteristic(countryCode:string){
        switch(countryCode) {
          case '+54' :
            return {min:6,max:11,country:'AR'}
          case '+598' :
            return {min:6,max:11,country:'UY'}
          case '+595' :
            return {min:6,max:10,country:'PY'}
          default:
            return {min:6,max:11,country:'AR'}
        }
    }
}