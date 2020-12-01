exports.likes = async (req,res) => {

    var secondId = req.body.second_id;
    var userArray = req.body.second_id;
  
    if (req.body.like != undefined){
  
    
      await userModel.updateOne({_id: req.params.id}, {$addToSet: {"likes": secondId}})  //addToSet tilskriver kun ID'et, hvis det ikke allerede er i arrayet.
      
      const like = await userModel.findOne(({_id: secondId}))                          
       
        //console.log(req.params.id, secondId, userArray, like.likes) 
        if (userArray.includes(secondId) && like.likes.includes(req.params.id)) {
            res.send();
                console.log("match")
  
            await userModel.updateOne({_id: req.params.id}, {$addToSet: {"matches": secondId}})
            .then(like => {
                res.status(200).render("matches.ejs", {like: like})
            })
        } else console.log("no match")
            res.status(200);
    }
  }