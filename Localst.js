class Localst{

    saveIntoDB(ch) {
        const character= this.getFromDB(); 
        character.push(ch);

        localStorage.setItem('character', JSON.stringify(character));
    }
    
    removeFromDB(id) {
        const character = this.getFromDB(); 
        character.forEach((ch, index) => {
            if (id === ch.id) {
                character.splice(index, 1);
            }
        });
        localStorage.setItem('character', JSON.stringify(character));


    }
    getFromDB() {
        let character;
        if (localStorage.getItem('character') === null) {
            character = [];

        }
        else {
            character = JSON.parse(localStorage.getItem('character'));
        }
        return character;
    }
}