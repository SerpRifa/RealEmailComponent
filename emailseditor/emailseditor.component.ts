import {Component} from '@angular/core'


  @Component({
    selector: 'emails-editor',    
    templateUrl: './emailseditor.component.html',
    styleUrls: ['./emailseditor.component.css'],
  })
  export class EmailsEditorComponent  {
    
    labelToAdd: string;
    emails = new Set();
    focused: string;
    isEmailsFocused = false;
    id: number = 0;
    isInvalid = true;
    
    addEmail(email :string){
      if (!email || email.trim() === '') { return; }      

      this.emails.add(email);      
      this.labelToAdd = '';

    }    

    onFocus() {    
      this.isEmailsFocused = true;      
    }

    focusOutFunction(){
      this.addEmail(this.labelToAdd);
    }

    removeEmail(email){      
      this.emails.delete(email);
    }
    
    getValidClass(email){
      var re = /\S+@\S+\.\S+/;
      if(!re.test(email)) return 'invalid';
    }

    onKeyDown(event: KeyboardEvent){      
      if (event.keyCode === 13 || event.key == ';') {
        event.preventDefault();
        this.addEmail(this.labelToAdd);
      }
    }    

    onPaste(value){      
      this._parseString(value);      
    }

    onSetRandomEmail(){
      this.addEmail(this._makeEmail());
    }

    onGetCount(){
      alert(`Count of emails ${this.emails.size}`);
    }

    _makeEmail(){
      let user = "";
      let domain = "gmail.com";
      let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for(let i=0; i < 7; i++ ){
        user += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      return `${user}@${domain}`;
    }

    _parseString(value: string){
      value = value.replace(/\s/g, ';');
      let emails = value.split(';');
      let me = this;
      emails.forEach(function(email){
        if(email != '') me.addEmail(email);
      });
    }

  }