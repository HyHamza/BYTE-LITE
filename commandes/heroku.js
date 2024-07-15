const { Hamza } = require('../TalkDrove/Hamza');
const s = require('../set')


Hamza(
    {
        nomCom : "setvar",
        categorie : "TalkDrove-Vars"
    }, async (dest , zk , commandeOptions) =>{

       const {ms,repondre,superUser , arg} = commandeOptions ;
       
       if(!superUser){repondre('only Mods can use this commande');return};
       if(!arg[0] || !(arg.join('').split('='))) {repondre('Bad format ; Exemple of using :\nSetvar OWNER_NAME=Beltah');return};
     
    const text = arg.join(" ")
     const Heroku = require("heroku-client");
   
     const heroku = new Heroku({
        token: s.HEROKU_APY_KEY,
      });

     let baseURI = "/apps/" + s.HEROKU_APP_NAME;
        await heroku.patch(baseURI + "/config-vars", {
          body: {
                  [text.split('=')[0]]: text.split('=')[1],
          },
        });
        await repondre('Heroku var changes , rebootings....')
    }
);

Hamza(
    {
        nomCom : "getallvar",
        categorie : "TalkDrove-Vars"
    }, async (dest , zk , commandeOptions) =>{

       const {ms,repondre,superUser , arg} = commandeOptions ;
       
       if(!superUser){repondre('only mods can use this commande');return}; 
      
            const Heroku = require("heroku-client");

			const heroku = new Heroku({
				token: s.HEROKU_APY_KEY,
			});
			let baseURI = "/apps/" + s.HEROKU_APP_NAME;

            let h = await heroku.get(baseURI+'/config-vars')
let str = '*TalkDrove-Vll vars*\n\n'
for (vr in h) {
str+= '☉ *'+vr+'* '+'= '+h[vr]+'\n'
}
 repondre(str)


}

);       


    Hamza(
        {
            nomCom : "getvar",
            categorie : "TalkDrove-Vars"
        }, async (dest , zk , commandeOptions) =>{
    
           const {ms,repondre,superUser , arg} = commandeOptions ;
           
           if(!superUser){repondre('Only Mods can use this command');return}; 
           if(!arg[0]) {repondre('insert the variable name in capital letter'); return} ;
      
           try {
            const Heroku = require("heroku-client");
               
            const heroku = new Heroku({
              token: s.HEROKU_APY_KEY,
            });
            let baseURI = "/apps/" + s.HEROKU_APP_NAME;
        let h = await heroku.get(baseURI+'/config-vars')
        for (vr in h) {
        if( arg.join(' ') ===vr ) return  repondre( vr+'= '+h[vr]) 	;
        } 
        
        } catch(e) {repondre('Error' + e)}
   
        });
