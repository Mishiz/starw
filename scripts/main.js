var Army = EMilitary;

for (let i = 0; i < Army.length; i++) {
  Army[i].Subordinates = 0;
  if (Army[i].parent === undefined) {
    Army[i].parent = 0;
}
}

for (var m = Army.length-1; m >= 0; m--) {
  for (var n = Army.length-1; n >= 0; n--) {
    if (Army[m].id == Army[n].parent) {
      Army[m].Subordinates = Army[m].Subordinates + 1 + Army[n].Subordinates;
    }
  }
}

//------------------------------------------------------------------------------
function initArmy(Army) {

for (let i = 0; i < Army.length; i++) {
    if ((Army[i].parent == 0)&&(Army[i].name == 'Darth Sidius')) {
    createUnit(Army[i]);
    break;
      }
}

for (let i = 0; i < Army.length; i++) {
    if ((Army[i].parent == 0)&&(Army[i].name != 'Darh Sidius')) {
    createUnit(Army[i]);
    break;
      }
}
} //function initArmy(Army)

initArmy(Army);

//------------------------------------------------------------------------------
function createUnit(UnitObj) {


  var mydiv = $('<div/>', {
     id:  'div_unit_' + UnitObj.id,
     class:  'subordinate',
 });
 $('.content .layout-positioner').append(mydiv);


var index = UnitObj.id

 var mydiv = $('<div/>', {
   id: 'div_unit_avatar_' + UnitObj.id,
   class:  'subordinate_avatar_pic subordinate_avatar',
   onclick: 'chosen_unit(this)',
});
$("#div_unit_" + UnitObj.id).append(mydiv);

var img_src = 'url("assets/avatars/' + UnitObj.image + '")';
$("#div_unit_avatar_" + UnitObj.id).css('background-image' , img_src);

if (UnitObj.Subordinates > 0) {
var mycounter = $('<p/>', {
   class:  'subordinate_counter',
   text: UnitObj.Subordinates,
});
$("#div_unit_" + UnitObj.id).append(mycounter);
}

var mydiv = $('<div/>', {
   id: 'div_unit_info_' + UnitObj.id,
   class:  'subordinate_avatar_info',
   onclick: 'chosen_unit(this)',
});
$("#div_unit_" + UnitObj.id).append(mydiv);

var myh2 = $('<h2/>', {
   class:  'Header_2 per_prop',
   text: UnitObj.name,
});
$("#div_unit_info_"+UnitObj.id).append(myh2);

var myp2 = $('<p/>', {
   class:  'Paragraph_2 per_prop',
   text: UnitObj.post,
});
$("#div_unit_info_"+UnitObj.id).append(myp2);

} //function createUnit(UnitObj)

//------------------------------------------------------------------------------

function chosen_unit(obj) {



   for (let i = 1; i < Army.length + 1; i++) {
   if ((obj.id == 'div_unit_avatar_' + i)||(obj.id == 'div_unit_info_' + i)) {
   var Unit_ID = i;
   }
   }

   for (ii = 0; ii < Army.length; ii ++) {
    if (Army[ii].id == Unit_ID) {
    var Unit_count_number1 = ii;
    }
   }

  var ArmyObj = Army[Unit_count_number1];

  $(".Header_1").html(ArmyObj.name);
  $(".Paragraph_1").html(ArmyObj.post);
  var img_src1 = 'assets/avatars/' + ArmyObj.image;
  $('#person_avatar').attr('src' , img_src1);


  $('.subordinate').remove();
  $('.hidden_back').addClass("visible_back");
  $('.hidden_back').removeClass("hidden_back");
  $('.hidden_arrow').addClass("visible_arrow");
  $('.hidden_arrow').removeClass("hidden_back");
  $('.back_button_btn').attr('id','back_btn_' + ArmyObj.parent);
  $('.back_button_btn').attr('onclick','Go_Back(this)');
  $('.arrow_left').attr('id','div_arrow_left_' + ArmyObj.id);
  $('.arrow_left').attr('onclick','GoToPreviousUnit(this)');
  $('.arrow_right').attr('id','div_arrow_right_' + ArmyObj.id);
  $('.arrow_right').attr('onclick','GoToNextUnit(this)');

   for (let j = 0; j < Army.length; j++) {
     if (Unit_ID == Army[j].parent) {
       createUnit(Army[j]);
     }
 }
} //function chosen_unit(obj)
//------------------------------------------------------------------------------

function Go_Back(obj) {
  if (obj.id == 'back_btn_0') {
  GoToFirstPage()
} else {

    $('.subordinate').remove();

   for (let i = 1; i < Army.length + 1; i++) {
     if (obj.id == 'back_btn_' + i) {
     var Unit_id1 = i;
   }
   }
   for (let jj = 0; jj < Army.length; jj ++) {
    if (Army[jj].id == Unit_id1) {
    var Unit_count_number = jj;
    }
   }

  var ArmyObj1 = Army[Unit_count_number];

  var img_src1 = 'assets/avatars/' + ArmyObj1.image;
  $('#person_avatar').attr('src' , img_src1);
  $(".Header_1").html(ArmyObj1.name);
  $(".Paragraph_1").html(ArmyObj1.post);
  $('.back_button_btn').attr('id','back_btn_' + ArmyObj1.parent);
  $('.back_button_btn').attr('onclick','Go_Back(this)');
  $('.arrow_left').attr('id','div_arrow_left_' + ArmyObj1.id);
  $('.arrow_right').attr('id','div_arrow_right_' + ArmyObj1.id);


   for (let j = 0; j < Army.length; j++) {
     if (Unit_id1 == Army[j].parent) {
       createUnit(Army[j]);
     }
     }
}

} //function Go_Back()

//------------------------------------------------------------------------------
function GoToPreviousUnit(obj) {
    $('.subordinate').remove();

    for (let i = 0; i < Army.length; i++ ) {
      if (obj.id == 'div_arrow_left_' + i) {
        var Unit_ID = i;
      }
    }

    for (let j = 0; j < Army.length; j ++) {
     if (Army[j].id == Unit_ID) {
     var Unit_count_number = j;
     }
    }

    var ArmyObj = Army[Unit_count_number];
    var SelectedUnit = 0;

    for (let ii = Army.length - 1; ii >= 0; ii--) {
      if ((ArmyObj.parent == Army[ii].parent) && (Army[ii].id < ArmyObj.id))  {
        SelectedUnit = Army[ii];
        break;
      }
    }

    if (SelectedUnit == 0)  {
    for (let ii = Army.length - 1; ii >= 0; ii--) {
      if ((ArmyObj.parent == Army[ii].parent) && (Army[ii].id >= ArmyObj.id)) {
        SelectedUnit = Army[ii];
        break;
      }
  }
}

     $(".Header_1").html(SelectedUnit.name);
     $(".Paragraph_1").html(SelectedUnit.post);
     var img_src1 = 'assets/avatars/' + SelectedUnit.image;
     $('#person_avatar').attr('src' , img_src1);

     $('.back_button_btn').attr('id','back_btn_' + SelectedUnit.parent);
     $('.back_button_btn').attr('onclick','Go_Back(this)');
     $('.arrow_left').attr('id','div_arrow_left_' + SelectedUnit.id);
     $('.arrow_left').attr('onclick','GoToPreviousUnit(this)');
     $('.arrow_right').attr('id','div_arrow_right_' + SelectedUnit.id);
     $('.arrow_right').attr('onclick','GoToNextUnit(this)');

      for (let j = 0; j < Army.length; j++) {
        if (SelectedUnit.id == Army[j].parent) {
          createUnit(Army[j]);
        }
    }
} //function GoToPreviousUnit()

//------------------------------------------------------------------------------
function GoToNextUnit(obj) {
  $('.subordinate').remove();

  for (let i = 0; i < Army.length; i++ ) {
    if (obj.id == 'div_arrow_right_' + i) {
      var Unit_ID = i;
    }
  }

  for (let j = 0; j < Army.length; j ++) {
   if (Army[j].id == Unit_ID) {
   var Unit_count_number = j;
   }
  }

  var ArmyObj = Army[Unit_count_number];
  var SelectedUnit = 0;

  for (let ii = 0; ii < Army.length; ii++) {
    if ((ArmyObj.parent == Army[ii].parent) && (Army[ii].id > ArmyObj.id))  {
      SelectedUnit = Army[ii];
      break;
    }
  }



  if (SelectedUnit == 0)  {
  for (let ii = 0; ii < Army.length; ii++) {
    if ((ArmyObj.parent == Army[ii].parent) && (Army[ii].id <= ArmyObj.id)) {
      SelectedUnit = Army[ii];
      break;
    }
}
}

   $(".Header_1").html(SelectedUnit.name);
   $(".Paragraph_1").html(SelectedUnit.post);
   var img_src1 = 'assets/avatars/' + SelectedUnit.image;
   $('#person_avatar').attr('src' , img_src1);

   $('.back_button_btn').attr('id','back_btn_' + SelectedUnit.parent);
   $('.back_button_btn').attr('onclick','Go_Back(this)');
   $('.arrow_left').attr('id','div_arrow_left_' + SelectedUnit.id);
   $('.arrow_left').attr('onclick','GoToPreviousUnit(this)');
   $('.arrow_right').attr('id','div_arrow_right_' + SelectedUnit.id);
   $('.arrow_right').attr('onclick','GoToNextUnit(this)');

    for (let j = 0; j < Army.length; j++) {
      if (SelectedUnit.id == Army[j].parent) {
        createUnit(Army[j]);
      }
  }
} //function GoToNextUnit()

//------------------------------------------------------------------------------
function GoToFirstPage() {
     $('.subordinate').remove();
     $('.visible_back').addClass("hidden_back");
     $('.visible_back').removeClass("visible_back");
     $('.visible_arrow').addClass("hidden_arrow");
     $('.visible_arrow').removeClass("visible_arrow");

     initArmy(Army);

     $('#person_avatar').attr('src' , 'assets/avatars/empire.png');

     $(".Header_1").html('Galactic Empire');
     $(".Paragraph_1").html('Imperial military');

} //function GoToFirstPage()
