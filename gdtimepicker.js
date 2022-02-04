Vue.component('gdtimepicker', {
      props: { value: {type:String,default:'8:00 AM'} 
               ,inputClass: {type:String,default:'form-control'}
               ,tableClass: {type:String,default:'table table-condensed table-bordered'}
               ,trClass: {type:String,default:''} 
               ,thClass: {type:String,default:'text-center ga-tp-08sz'}
               ,hrClass: {type:String,default:'text-center'} 
               ,mnClass: {type:String,default:'text-center'} 
               ,cellClass: {type:String,default:'ga-tp-cell'} 
               ,selClass: {type:String,default:'ga-tp-sel'} 
               ,slContClass: {type:String,default:'gd-slider-container'}
               ,sliderClass: {type:String,default:'gd-slider'}
     }
  ,data: function() { return { tmStr: this.value,addedMins:0 }; }
  ,watch: { 'value': function() {this.tmStr = this.value; }}
  ,computed: {
    tmParts: function() { // parse the hour, min, tt to array
      var ta = ['','','AM'];
      var ta2 = [];
      var ws = (this.tmStr || '');
      if (ws.split) ta2 = ws.split(':'); 
      if (ta2.length > 1) {
        ta[0] = ta2[0];
        var ta3 = ta2[1].split(' ');
        if (ta3.length > 1) { ta[1] = ta3[0]; ta[2] = ta3[1]; }
      }  
      return ta; 
    }
    ,baseMins: function() {
      var bm = this.tmParts[1];
      return ( bm - (bm % 15) );
    }
  }
  ,methods: { emitIt: function () {
      this.$emit('input',this.tmStr); 
    }
    ,setIt: function(s1,s3) {
      var rs = s1 + ':' + (this.tmParts[1] || '00') + ' ' + s3;
      this.tmStr = rs; this.emitIt();
    }
    ,setMn: function(s2) {
      
      var rs = (this.tmParts[0] || '7') + ':' + s2 + ' ' + (this.tmParts[2] || 'AM');
      this.tmStr = rs; this.emitIt();
      this.addedMins = 0;
    }
    ,setAddedMins: function() {
      var minInt = parseInt(this.addedMins) + parseInt(this.baseMins);
      var minIntStr = '' + minInt;
      if (minInt < 10) minIntStr = '0' + minInt;
      var rs = (this.tmParts[0] || '7') + ':' + minIntStr + ' ' + (this.tmParts[2] || 'AM');
      this.tmStr = rs; this.emitIt();
    }
    ,aC: function(s,s3) { var ro = null;
      if ((s == this.tmParts[0]) && (s3 == this.tmParts[2]))
        ro = this.selClass;
      return ro;
    }
    ,aCM: function(s2) { var ro = null;
      if  (s2 == this.tmParts[1])
        ro = this.selClass;
      return ro;
    }
  }
  ,template: `<div class="gd-tp-dropdown"><slot></slot>
  <input :class="inputClass" type="text" maxlength="8" v-model="tmStr" @keyup="emitIt">
<div class="gd-tp-dropdown-content">
   <div>
    <table :class="tableClass">
      <thead><th :class="thClass" colspan="7">Hour</th>&nbsp;<th :class="thClass">Min</th></thead> <tbody>
       <tr :class="trClass"><th rowspan="2" :class="thClass" scope="row">AM</th>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('12','AM')"><span :class="aC('12','AM')">12</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('1','AM')"><span :class="aC('1','AM')">01</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('2','AM')"><span :class="aC('2','AM')">02</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('3','AM')"><span :class="aC('3','AM')">03</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('4','AM')"><span :class="aC('4','AM')">04</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('5','AM')"><span :class="aC('5','AM')">05</span></div></td>
         &nbsp;
         <td :class="mnClass"><div :class="cellClass" @click="setMn('00')"><span :class="aCM('00')">00</span></div></td>
       </tr> <tr :class="trClass">
         <td :class="hrClass"><div :class="cellClass" @click="setIt('6','AM')"><span :class="aC('6','AM')">06</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('7','AM')"><span :class="aC('7','AM')">07</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('8','AM')"><span :class="aC('8','AM')">08</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('9','AM')"><span :class="aC('9','AM')">09</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('10','AM')"><span :class="aC('10','AM')">10</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('11','AM')"><span :class="aC('11','AM')">11</span></div></td>
         &nbsp;
         <td :class="mnClass"><div :class="cellClass" @click="setMn('15')"><span :class="aCM('15')">15</span></div></td>
       </tr>  <tr :class="trClass"><th rowspan="2" :class="thClass" scope="row">PM</th>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('12','PM')"><span :class="aC('12','PM')">12</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('1','PM')"><span :class="aC('1','PM')">01</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('2','PM')"><span :class="aC('2','PM')">02</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('3','PM')"><span :class="aC('3','PM')">03</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('4','PM')"><span :class="aC('4','PM')">04</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('5','PM')"><span :class="aC('5','PM')">05</span></div></td>
         &nbsp;
         <td :class="mnClass"><div :class="cellClass" @click="setMn('30')"><span :class="aCM('30')">30</span></div></td>
       </tr> <tr :class="trClass">
         <td :class="hrClass"><div :class="cellClass" @click="setIt('6','PM')"><span :class="aC('6','PM')">06</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('7','PM')"><span :class="aC('7','PM')">07</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('8','PM')"><span :class="aC('8','PM')">08</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('9','PM')"><span :class="aC('9','PM')">09</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('10','PM')"><span :class="aC('10','PM')">10</span></div></td>
         <td :class="hrClass"><div :class="cellClass" @click="setIt('11','PM')"><span :class="aC('11','PM')">11</span></div></td>
         &nbsp;
         <td :class="mnClass"><div :class="cellClass" @click="setMn('45')"><span :class="aCM('45')">45</span></div></td>
       </tr>  </tbody></table>
      </div>
      <div :class="slContClass">
         <input :class="sliderClass" type="range" min="0" max="14" v-model="addedMins" @input="setAddedMins" >
      </div>
   </div> 
</div>`
});
