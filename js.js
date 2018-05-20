
function calculation () {
  var SDOR = $('#sdor').val(),         //  наименование СДЯВ
      VOLUME = $('#volume').val(),     //  объём СДЯВ
      V = $('#wind').val(),            //  скорость ветра
      T = $('#temperature').val(),     //  температура на высоте 2 метра
      VSP = $('.input-vsp').val(),     //  степень вертикальной устойчивости воздухa
      RELIEF = $('#relief').val(),     //  вид рельефа
      VEGET = $('#vegetation').val(),  //  тип ростительности
      FOLIAGE = $('#foliage').val(),   //  наличие растительности
      PROB = $('#probability').val(),  //  вероятность
      G1T,                             //  глубина распространения первичного облака СДЯВ (табличное значение)
      G2T,                             //  глубина распространения вторичного облака СДЯВ (табличное значение)
      OTN,                             //  отношение заданого значения величины СДЯВ к табличному Qз/Qt
      KK,                              //  коэффициент пропорциональности Кк
      KT1,                             // коэффициент влияния температуры воздуха на глубину распространения первичного облака Kt1
      KT2,                             // коэффициент влияния температуры воздуха на глубину распространения вторичного облака Kt2
      KR,                              // коэфициент рассеивания СДЯВ за счет рельефа местности и растительности на ней
      KM,                              // коэфициент влияния местности
      G1,                              // глубина распространения первичного облака СДЯВ
      G2,                              // глубина распространения вторичного облака СДЯВ
      RA,                              // радиус аварии
      FI1,                             // угол распространения первичного облака
      FI2,                             // угол распространения первичного облака
      ERRORCONV = "Ошибка! При конвекции скороть ветра не может быть больше 4 м/с",
      ERRORINV = "Ошибка! При конвекции скороть ветра не может быть больше 4 м/с",
      TIMEEVA,                         // Время испарения СДЯв
      S1,
      S2;
// Рачет глубины распостранения первичного и вторичного облака СДЯВ (табличных значений),  отношения заданого значения величины СДЯВ к табличному Qз/Qt
if ( SDOR == "chlorine" ){ // для хлора
if ( VSP == "convection" && V != 0 ){ //  для конвекции
if ( VOLUME < 5 && V <= 4) {OTN = VOLUME/1; G2T=0.5; G1T = 0.5;} else{
if ( VOLUME >= 5 && VOLUME < 20 ) {OTN = VOLUME/10; G2T=0.5; if (V<1.49){G1T=0.9;} else {if (V<2.49){G1T=0.6;} else {if(V<=4){G1T=0.5;} else {alert(ERRORCONV);}}}} else {
if ( VOLUME >= 20 && VOLUME < 40 ) {OTN = VOLUME/30; G2T=0.5;if (V<1.49){G1T=1.4;} else {if (V<2.49){G1T=1;} else {if(V<=4){G1T=0.7;} else {alert(ERRORCONV);}}}} else {
if ( VOLUME >= 40 && VOLUME < 75 ) {OTN = VOLUME/50; G2T=0.5; if (V<1.49){G1T=1.8;} else {if (V<2.49){G1T=1.3;} else {if(V<=4){G1T=0.9;} else {alert(ERRORCONV);}}}} else {
if ( VOLUME >= 75 && VOLUME < 125 ) {OTN = VOLUME/100; G2T=0.5; if (V<1.49){G1T=2.9;} else {if (V<2.49){G1T=2;} else {if(V<=4){G1T=1.7;} else {alert(ERRORCONV);}}}} else {
if ( VOLUME >= 125 && VOLUME < 225 ) {OTN = VOLUME/150; G2T=0.5; if (V<1.49){G1T=3.5;} else {if (V<2.49){G1T=2.6;} else {if(V<=4){G1T=2.1;} else {alert(ERRORCONV);}}}} else {
if ( VOLUME >= 225 && VOLUME < 500 ) {OTN = VOLUME/300; G2T=0.6; if (V<1.49){G1T=5;} else {if (V<2.49){G1T=3.5;} else {if(V<=4){G1T=2.9;} else {alert(ERRORCONV);}}}} else {
if ( VOLUME >= 500 && VOLUME < 875 ) {OTN = VOLUME/750; G2T=1; if (V<1.49){G1T=2.6;} else {if (V<2.49){G1T=1.9;} else {if(V<=4){G1T=1.5;} else {alert(ERRORCONV);}}}} else {
if ( VOLUME >= 875 && VOLUME < 1500 ) {OTN = VOLUME/100; G2T=1.2; if (V<1.49){G1T=3.4;} else {if (V<2.49){G1T=2.5;} else {if(V<=4){G1T=2;} else {alert(ERRORCONV);}}}} else {
if ( VOLUME >= 1500 ) {OTN = VOLUME/2000; G2T=1.5; if (V<1.49){G1T=4.8;} else {if (V<2.49){G1T=3.5;} else {if(V<=4){G1T=2.9;} else {alert(ERRORCONV);}}}} else {
  if(V>4){alert(ERRORCONV);} else {alert('ОШИБКА !' + "\n" + 'Введите числовое значение объёма разрушеной ёмкости СДЯВ');}
}}}}}}}}}}} else {
  if ( VSP == "isothermy" && V != 0 ){  //  для изотермии
    if ( VOLUME < 5) {OTN = VOLUME/1; G2T=0.5; if (V< 1.49) {G1T = 0.6;} else {if (V>=1.5) {G1T=0.5;}}} else{
    if ( VOLUME >= 5 && VOLUME < 20 ) {OTN = VOLUME/10; G2T=0.8; if (V< 1.49) {G1T = 4;} else {if (V<3) {G1T=2.7;} else {if(V<=5){G1T=1.8;} else {if(V>5){G1T=1.3;}}}}} else{
    if ( VOLUME >= 20 && VOLUME < 40 ) {OTN = VOLUME/30; G2T=1.4; if (V< 1.49) {G1T = 7.4;} else {if (V<3) {G1T=5;} else {if(V<=5){G1T=3.4;} else {if(V>5){G1T=2.7;}}}}} else{
    if ( VOLUME >= 40 && VOLUME < 75 ) {OTN = VOLUME/50; G2T=1.8; if (V< 1.49) {G1T = 10.1;} else {if (V<3) {G1T=6.8;} else {if(V<=5){G1T=4.6;} else {if(V>5){G1T=3.6;}}}}} else {
    if ( VOLUME >= 75 && VOLUME < 125 ) {OTN = VOLUME/100; G2T=1.2; if (V< 1.49) {G1T = 14.1;} else {if (V<3) {G1T=9.5;} else {if(V<=5){G1T=6.4;} else {if(V>5){G1T=5.1;}}}}} else{
    if ( VOLUME >= 125 && VOLUME < 225 ) {OTN = VOLUME/150; G2T=1.5; if (V< 1.49) {G1T = 17.8;} else {if (V<3) {G1T=12;} else {if(V<=5){G1T=8.1;} else {if(V>5){G1T=6.1;}}}}} else {
    if ( VOLUME >= 225 && VOLUME < 500 ) {OTN = VOLUME/300; G2T=2.2; if (V< 1.49) {G1T = 26;} else {if (V<3) {G1T=17.8;} else {if(V<=5){G1T=12;} else {if(V>5){G1T=9.5;}}}}} else {
    if ( VOLUME >= 500 && VOLUME < 875 ) {OTN = VOLUME/750; G2T=3.4; if (V< 1.49) {G1T = 12.6;} else {if (V<3) {G1T=8.6;} else {if(V<=5){G1T=5.8;} else {if(V>5){G1T=4.6;}}}}} else {
    if ( VOLUME >= 875 && VOLUME < 1500 ) {OTN = VOLUME/1000; G2T=4.6; if (V< 1.49) {G1T = 16.9;} else {if (V<3) {G1T=11.4;} else {if(V<=5){G1T=7.7;} else {if(V>5){G1T=6.1;}}}}} else {
    if ( VOLUME >= 1500 ) {OTN = VOLUME/2000; G2T=6.7; if (V< 1.49) {G1T = 26;} else {if (V<3) {G1T=17;} else {if(V<=5){G1T=12;} else {if(V>5){G1T=9.3;}}}}} else {
      alert('ОШИБОЧКА 2');
    }}}}}}}}}}} else{
      if ( VSP == "inversion" && V != 0 ) {  //  для инверсии
        if ( VOLUME < 5 && V <= 4) {OTN = VOLUME/1; G2T=0.5; if (V<1.49){G1T=2.1;} else {if (V<2.49){G1T=1.4;} else {if(V<=4){G1T=0.9;} else {alert(ERRORINV);}}}} else{
        if ( VOLUME >= 5 && VOLUME < 20 ) {OTN = VOLUME/10; G2T=1.1; if (V<1.49){G1T=8.7;} else {if (V<2.49){G1T=5.7;} else {if(V<=4){G1T=3.7;} else {alert(ERRORINV);}}}} else {
        if ( VOLUME >= 20 && VOLUME < 40 ) {OTN = VOLUME/30; G2T=2.7; if (V<1.49){G1T=17.2;} else {if (V<2.49){G1T=11.2;} else {if(V<=4){G1T=7.3;} else {alert(ERRORINV);}}}} else {
        if ( VOLUME >= 40 && VOLUME < 75 ) {OTN = VOLUME/50; G2T=3.6; if (V<1.49){G1T=24;} else {if (V<2.49){G1T=15.4;} else {if(V<=4){G1T=10;} else {alert(ERRORINV);}}}} else {
        if ( VOLUME >= 75 && VOLUME < 125 ) {OTN = VOLUME/100; G2T=2; if (V<1.49){G1T=30;} else {if (V<2.49){G1T=20;} else {if(V<=4){G1T=15.4;} else {alert(ERRORINV);}}}} else {
        if ( VOLUME >= 125 && VOLUME < 225 ) {OTN = VOLUME/150; G2T=2.6; if (V<1.49){G1T=39;} else {if (V<2.49){G1T=25;} else {if(V<=4){G1T=20;} else {alert(ERRORINV);}}}} else {
        if ( VOLUME >= 225 && VOLUME < 500 ) {OTN = VOLUME/300; G2T=3.8; if (V<1.49){G1T=60;} else {if (V<2.49){G1T=39;} else {if(V<=4){G1T=30;} else {alert(ERRORINV);}}}} else {
        if ( VOLUME >= 500 && VOLUME < 875 ) {OTN = VOLUME/750; G2T=6.1; if (V<1.49){G1T=27;} else {if (V<2.49){G1T=18;} else {if(V<=4){G1T=14;} else {alert(ERRORINV);}}}} else {
        if ( VOLUME >= 875 && VOLUME < 1500 ) {OTN = VOLUME/1000; G2T=8.7; if (V<1.49){G1T=37;} else {if (V<2.49){G1T=24;} else {if(V<=4){G1T=18.7;} else {alert(ERRORINV);}}}} else {
        if ( VOLUME >= 1500 ) {OTN = VOLUME/2000; G2T=13; if (V<1.49){G1T=59;} else {if (V<2.49){G1T=38;} else {if(V<=4){G1T=30;} else {alert(ERRORINV);}}}} else {
          alert('ОШИБОЧКА 3');
        }}}}}}}}}}
      } else {alert('ERROR !!!!!')}
    }
  }
}
if ( SDOR == "ammonia" ){ // для аммиака
  if ( VSP == "convection" && V != 0 ){ //  для конвекции
    if ( VOLUME < 40 && V <= 4 ) {OTN = VOLUME/30; G2T=0.5; G1T = 0.5;} else{
    if ( VOLUME >= 40 && VOLUME < 75 ) {OTN = VOLUME/50; G2T=0.5; if (V<1.49){G1T=0.7;} else {if (V<2.49){G1T=0.5;} else {if(V<=4){G1T=0.5;} else {alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 75 && VOLUME < 125 ) {OTN = VOLUME/100; G2T=0.5;if (V<1.49){G1T=0.9;} else {if (V<2.49){G1T=0.7;} else {if(V<=4){G1T=0.6;} else {alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 125 && VOLUME < 225 ) {OTN = VOLUME/150; G2T=0.5; if (V<1.49){G1T=1.1;} else {if (V<2.49){G1T=0.8;} else {if(V<=4){G1T=0.7;} else {alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 225 && VOLUME < 400 ) {OTN = VOLUME/300; G2T=0.5; if (V<1.49){G1T=1.6;} else {if (V<2.49){G1T=1.1;} else {if(V<=4){G1T=0.9;} else {alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 400 && VOLUME < 750 ) {OTN = VOLUME/500; G2T=0.5; if (V<1.49){G1T=2;} else {if (V<2.49){G1T=1.4;} else {if(V<=4){G1T=1.2;} else {alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 750 && VOLUME < 1500 ) {OTN = VOLUME/1000; G2T=0.5; if (V<1.49){G1T=2.8;} else {if (V<2.49){G1T=2;} else {if(V<=4){G1T=1.6;} else {alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 1500 && VOLUME < 6000 ) {OTN = VOLUME/2000; G2T=0.5; if (V<1.49){G1T=3.9;} else {if (V<2.49){G1T=2.8;} else {if(V<=4){G1T=2.3;} else {alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 6000 && VOLUME < 20000 ) {OTN = VOLUME/10000; G2T=0.7; if (V<1.49){G1T=3.1;} else {if (V<2.49){G1T=2.3;} else {if(V<=4){G1T=1.9;} else {alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 20000 ) {OTN = VOLUME/30000; G2T=0.8; if (V<1.49){G1T=5.3;} else {if (V<2.49){G1T=3.8;} else {if(V<=4){G1T=3.1;} else {alert(ERRORCONV);}}}} else {
      if(V>4){alert('Ошибка! При конвекции скороть ветра не может быть больше 4 м/с');} else {alert('ОШИБОЧКА 1');}
    }}}}}}}}}}} else {
      if ( VSP == "isothermy" && V != 0 ){  //  для изотермии
        if ( VOLUME < 40 ) {OTN = VOLUME/30; G2T=0.5; if (V< 1.49) {G1T = 1.8;} else {if (V<3) {G1T=1.2;} else {if(V<=5){G1T=0.8;} else {if(V>5){G1T=0.6;}}}}} else{
        if ( VOLUME >= 40 && VOLUME < 75 ) {OTN = VOLUME/50; G2T=0.6; if (V< 1.49) {G1T = 2.4;} else {if (V<3) {G1T=1.6;} else {if(V<=5){G1T=1.1;} else {if(V>5){G1T=0.8;}}}}} else{
        if ( VOLUME >= 75 && VOLUME < 125 ) {OTN = VOLUME/100; G2T=0.5; if (V< 1.49) {G1T = 3.5;} else {if (V<3) {G1T=2.4;} else {if(V<=5){G1T=1.6;} else {if(V>5){G1T=1.3;}}}}} else{
        if ( VOLUME >= 125 && VOLUME < 225 ) {OTN = VOLUME/150; G2T=0.5; if (V< 1.49) {G1T = 4.4;} else {if (V<3) {G1T=3;} else {if(V<=5){G1T=2;} else {if(V>5){G1T=1.6;}}}}} else {
        if ( VOLUME >= 225 && VOLUME < 400 ) {OTN = VOLUME/300; G2T=0.5; if (V< 1.49) {G1T = 6.6;} else {if (V<3) {G1T=4.4;} else {if(V<=5){G1T=3;} else {if(V>5){G1T=2.4;}}}}} else{
        if ( VOLUME >= 400 && VOLUME < 750 ) {OTN = VOLUME/500; G2T=0.6; if (V< 1.49) {G1T = 8.8;} else {if (V<3) {G1T=6;} else {if(V<=5){G1T=4;} else {if(V>5){G1T=3.2;}}}}} else {
        if ( VOLUME >= 750 && VOLUME < 1500 ) {OTN = VOLUME/1000; G2T=0.8; if (V< 1.49) {G1T = 13.1;} else {if (V<3) {G1T=8.8;} else {if(V<=5){G1T=6;} else {if(V>5){G1T=4.7;}}}}} else {
        if ( VOLUME >= 1500 && VOLUME < 6000 ) {OTN = VOLUME/2000; G2T=1; if (V< 1.49) {G1T = 20;} else {if (V<3) {G1T=13.5;} else {if(V<=5){G1T=9.1;} else {if(V>5){G1T=7.2;}}}}} else {
        if ( VOLUME >= 6000 && VOLUME < 20000 ) {OTN = VOLUME/10000; G2T=2.7; if (V< 1.49) {G1T = 15.4;} else {if (V<3) {G1T=10.4;} else {if(V<=5){G1T=7;} else {if(V>5){G1T=5.5;}}}}} else {
        if ( VOLUME >= 20000 ) {OTN = VOLUME/30000; G2T=4; if (V< 1.49) {G1T = 29;} else {if (V<3) {G1T=19.5;} else {if(V<=5){G1T=13.1;} else {if(V>5){G1T=10.4;}}}}} else {
          alert('ОШИБОЧКА 2');
        }}}}}}}}}}} else{
          if ( VSP == "inversion" && V != 0 ) {  //  для инверсии
            if ( VOLUME < 40 && V <= 4) {OTN = VOLUME/30; G2T=0.7; if (V<1.49){G1T=3.6;} else {if (V<2.49){G1T=2.4;} else {if(V<=4){G1T=1.5;} else {alert(ERRORINV);}}}} else{
            if ( VOLUME >= 40 && VOLUME < 75 ) {OTN = VOLUME/50; G2T=0.9; if (V<1.49){G1T=5;} else {if (V<2.49){G1T=3.2;} else {if(V<=4){G1T=2.1;} else {alert(ERRORINV);}}}} else {
            if ( VOLUME >= 75 && VOLUME < 125 ) {OTN = VOLUME/100; G2T=0.5; if (V<1.49){G1T=6.7;} else {if (V<2.49){G1T=4.4;} else {if(V<=4){G1T=3.4;} else {alert(ERRORINV);}}}} else {
            if ( VOLUME >= 125 && VOLUME < 225 ) {OTN = VOLUME/150; G2T=0.5; if (V<1.49){G1T=8.6;} else {if (V<2.49){G1T=5.6;} else {if(V<=4){G1T=4.3;} else {alert(ERRORINV);}}}} else {
            if ( VOLUME >= 225 && VOLUME < 400 ) {OTN = VOLUME/300; G2T=0.8; if (V<1.49){G1T=13.3;} else {if (V<2.49){G1T=8.6;} else {if(V<=4){G1T=6.7;} else {alert(ERRORINV);}}}} else {
            if ( VOLUME >= 400 && VOLUME < 750 ) {OTN = VOLUME/500; G2T=0.9; if (V<1.49){G1T=18.3;} else {if (V<2.49){G1T=11.9;} else {if(V<=4){G1T=9.2;} else {alert(ERRORINV);}}}} else {
            if ( VOLUME >= 750 && VOLUME < 1500 ) {OTN = VOLUME/1000; G2T=1.4; if (V<1.49){G1T=28;} else {if (V<2.49){G1T=18.3;} else {if(V<=4){G1T=14.2;} else {alert(ERRORINV);}}}} else {
            if ( VOLUME >= 1500 && VOLUME < 6000 ) {OTN = VOLUME/2000; G2T=1.6; if (V<1.49){G1T=44.8;} else {if (V<2.49){G1T=29.1;} else {if(V<=4){G1T=22.6;} else {alert(ERRORINV);}}}} else {
            if ( VOLUME >= 6000 && VOLUME < 20000 ) {OTN = VOLUME/10000; G2T=3.5; if (V<1.49){G1T=33.7;} else {if (V<2.49){G1T=22;} else {if(V<=4){G1T=17;} else {alert(ERRORINV);}}}} else {
            if ( VOLUME >= 20000 ) {OTN = VOLUME/30000; G2T=5.4; if (V<1.49){G1T=67;} else {if (V<2.49){G1T=43.6;} else {if(V<=4){G1T=34;} else {alert(ERRORINV);}}}} else {
              alert('ОШИБОЧКА 3');
            }}}}}}}}}}
          } else {alert('ERROR !!!!!')}
        }
      }
    }
if ( SDOR == "phosgene" ) { // для фосгена
  if ( VSP == "convection" && V != 0 ){
    if ( VOLUME < 7.5 ) { OTN = VOLUME/5; G2T = 0.5; if (V<1.49){G1T=0.9;}else{if(V<=4){G1T=0.5;} else{alert(ERRORCONV);}}} else {
    if ( VOLUME < 20 ) {OTN = VOLUME/10; G2T = 0.5; if (V<1.49){G1T=1.2;}else{if(V<=4){G1T=0.5;}else{alert(ERRORCONV);}}} else {
    if ( VOLUME < 40 ) {OTN = VOLUME/30; G2T= 0.6; if (V<1.49){G1T=2.1;}else{if(V<2.49){G1T=0.8;}else{if(V<=4){G1T=0.7;}else{alert(ERRORCONV);}}}} else {
    if ( VOLUME < 75 ) {OTN = VOLUME/50; G2T= 0.9; if (V<1.49){G1T=2.6;}else{if(V<2.49){G1T=1;}else{if(V<=4){G1T=0.8;}else{alert(ERRORCONV);}}}} else {
    if ( VOLUME < 125 ) {OTN = VOLUME/100; G2T= 0.6; if (V<1.49){G1T=3.6;}else{if(V<2.49){G1T=2.6;}else{if(V<=4){G1T=2.2;}else{alert(ERRORCONV);}}}} else {
    if ( VOLUME < 200 ) {OTN = VOLUME/150; G2T= 0.8; if (V<1.49){G1T=4.4;}else{if(V<2.49){G1T=3.2;}else{if(V<=4){G1T=2.6;}else{alert(ERRORCONV);}}}} else {
    if ( VOLUME >= 200 ) {OTN = VOLUME/250; G2T= 1; if (V<1.49){G1T=5;}else{if(V<2.49){G1T=3.6;}else{if(V<=4){G1T=3;}else{alert(ERRORCONV);}}}} else {
      alert('ОШИБОЧКА 1');
    }}}}}}}
  } else {
    if ( VSP == "isothermy" && V != 0 ) { // для изотермии
      if ( VOLUME < 7.5 ) { OTN = VOLUME/5; if (V<1.49){G1T=1.7;}else{if(V<2.49){G1T=1.2;}else{if(V<5){G1T=0.8;}else{if(V>=5){G1T=0.6;}}}}} else {
      if ( VOLUME < 20 ) { OTN = VOLUME/10; if (V<1.49){G1T=2.5;}else{if(V<2.49){G1T=1.7;}else{if(V<5){G1T=1.2;}else{if(V>=5){G1T=0.9;}}}}} else {
      if ( VOLUME < 40 ) { OTN = VOLUME/30; if (V<1.49){G1T=4.8;}else{if(V<2.49){G1T=3.2;}else{if(V<5){G1T=2.2;}else{if(V>=5){G1T=1.7;}}}}} else {
      if ( VOLUME < 75 ) { OTN = VOLUME/50; if (V<1.49){G1T=6.4;}else{if(V<2.49){G1T=4.3;}else{if(V<5){G1T=2.9;}else{if(V>=5){G1T=2.3;}}}}} else {
      if ( VOLUME < 125 ) { OTN = VOLUME/100; if (V<1.49){G1T=10;}else{if(V<2.49){G1T=6.5;}else{if(V<5){G1T=4.4;}else{if(V>=5){G1T=3.5;}}}}} else {
      if ( VOLUME < 200 ) { OTN = VOLUME/150; if (V<1.49){G1T=12.5;}else{if(V<2.49){G1T=8.1;}else{if(V<5){G1T=5.5;}else{if(V>=5){G1T=4.4;}}}}} else {
      if ( VOLUME >= 200 ) { OTN = VOLUME/250; if (V<1.49){G1T=18.5;}else{if(V<2.49){G1T=12;}else{if(V<5){G1T=8.1;}else{if(V>=5){G1T=6.5;}}}}} else {
        alert('ОШИБОЧКА 2');
      }}}}}}}
    } else {
      if ( VSP == "inversion" && V != 0 ) { // для инверсии
        if ( VOLUME < 7.5 ) { OTN = VOLUME/5; if (V<1.49){G1T=2.7;}else{if(V<=4){G1T=1.7;} else{if(V<=4){G1T=1.3;}else{alert(ERRORINV);}}}} else {
        if ( VOLUME < 20 ) { OTN = VOLUME/10; if (V<1.49){G1T=4.1;}else{if(V<=4){G1T=2.7;}else{if(V<=4){G1T=2.1;}else{alert(ERRORINV);}}}} else {
        if ( VOLUME < 40 ) { OTN = VOLUME/30; if (V<1.49){G1T=8.1;}else{if(V<2.49){G1T=5.2;}else{if(V<=4){G1T=4.1;}else{alert(ERRORINV);}}}} else {
        if ( VOLUME < 75 ) { OTN = VOLUME/50; if (V<1.49){G1T=11.1;}else{if(V<2.49){G1T=7.2;}else{if(V<=4){G1T=5.6;}else{alert(ERRORINV);}}}} else {
        if ( VOLUME < 125 ) { OTN = VOLUME/100; if (V<1.49){G1T=16.7;}else{if(V<2.49){G1T=11;}else{if(V<=4){G1T=8.2;}else{alert(ERRORINV);}}}} else {
        if ( VOLUME < 200 ) { OTN = VOLUME/150; if (V<1.49){G1T=21;}else{if(V<2.49){G1T=13.8;}else{if(V<=4){G1T=10.5;}else{alert(ERRORINV);}}}} else {
        if ( VOLUME >= 200 ) { OTN = VOLUME/250; if (V<1.49){G1T=32;}else{if(V<2.49){G1T=20.5;}else{if(V<=4){G1T=15.5;}else{alert(ERRORINV);}}}} else {
          alert('ОШИБОЧКА 3');
        }}}}}}}
      }}}}
if ( SDOR == "phosgene" ){ // расчет G2T для фосгена
  if ( VSP == "isothermy" ) {
    if ( VOLUME < 3.5 ) {G2T=0.5;} else {if(VOLUME < 7.5){G2T=1;}else{if(VOLUME<20){G2T=1.4;}else{if(VOLUME<40){G2T=2.5;}else{if(VOLUME<75){G2T=3.3;}else{if(VOLUME<125){G2T=2.1;}else{if(VOLUME<200){G2T=2.6;}else{G2T=3.8;}}}}}}}
  } else {
    if ( VOLUME < 3.5 ) {G2T=0.6;} else {if(VOLUME < 7.5){G2T=1.4;}else{if(VOLUME<20){G2T=2.1;}else{if(VOLUME<40){G2T=3.9;}else{if(VOLUME<75){G2T=5.2;}else{if(VOLUME<125){G2T=3.8;}else{if(VOLUME<200){G2T=4.8;}else{G2T=7.1;}}}}}}}
  }}
if ( SDOR == "carbonOxide" ) {
  G2T = 0;
  if ( VSP == "convection" && V != 0 ) {
    if (V>4){alert(ERRORCONV);} else {
    if ( VOLUME < 7.5 ){OTN = VOLUME/5; G1T=0.5;} else {
    if ( VOLUME < 20 ){OTN = VOLUME/10; G1T=0.5;} else {
    if ( VOLUME < 40 ){OTN = VOLUME/30; G1T=0.5;} else {
    if ( VOLUME < 75 ){OTN = VOLUME/50; if (V<1.49){G1T=0.8;}else{if(V<2.49){G1T=0.6;}else{if(V<=4){G1T=0.5;}}}} else {
    if ( VOLUME >= 75 ){OTN = VOLUME/100; if (V<1.49){G1T=0.8;}else{if(V<2.49){G1T=0.6;}else{if(V<=4){G1T=0.5;}}}} else{
      alert("АШИБОС !!!!");
    }}}}}}
  } else {
    if ( VSP == "isothermy" && V != 0 ) {
      if ( VOLUME < 7.5 ){OTN = VOLUME/5; if(V<1.49){G1T=0.8;} else{G1T=0.5;}} else {
      if ( VOLUME < 20 ){OTN = VOLUME/10; if(V<1.49){G1T=1.2;} else{if(V<3){G1T=0.8;}else{if(V<5){G1T=0.6;} else{G1T=0.5;}}}} else {
      if ( VOLUME < 40 ){OTN = VOLUME/30; if(V<1.49){G1T=2.2;} else{if(V<3){G1T=1.5;}else{if(V<5){G1T=0.9;} else{G1T=0.8;}}}} else {
      if ( VOLUME < 75 ){OTN = VOLUME/50; if(V<1.49){G1T=3;} else{if(V<3){G1T=2;}else{if(V<5){G1T=1.4;} else{G1T=1.1;}}}} else {
      if ( VOLUME >= 75 ){OTN = VOLUME/100; if(V<1.49){G1T=4.8;} else{if(V<3){G1T=3.2;}else{if(V<5){G1T=2.2;} else{G1T=1.6;}}}} else {
        alert("АШИБОС !!!!");
      }}}}}} else {
          if ( VSP == "inversion" && V != 0 ) {
            if (V>4){alert(ERRORINV);} else {
            if ( VOLUME < 7.5 ){OTN = VOLUME/5; if (V<1.49){G1T=1.5;}else{if(V<2.49){G1T=1;}else{if(V<=4){G1T=0.7;}}}} else {
            if ( VOLUME < 20 ){OTN = VOLUME/10; if (V<1.49){G1T=2.3;}else{if(V<2.49){G1T=1.5;}else{if(V<=4){G1T=1;}}}} else {
            if ( VOLUME < 40 ){OTN = VOLUME/30; if (V<1.49){G1T=4.6;}else{if(V<2.49){G1T=3;}else{if(V<=4){G1T=1.9;}}}} else {
            if ( VOLUME < 75 ){OTN = VOLUME/50; if (V<1.49){G1T=6.6;}else{if(V<2.49){G1T=4.3;}else{if(V<=4){G1T=2.7;}}}} else {
            if ( VOLUME >= 75 ){OTN = VOLUME/100; if (V<1.49){G1T=10.1;}else{if(V<2.49){G1T=6.6;}else{if(V<=4){G1T=4.3;}}}} else {
              alert("АШИБОС !!!!");
            }}}}}}}}}
}

//  Расчет значения коэффициента Кк
if ( VSP == "convection" ){
  if (OTN<0.3){KK=0.5;} else{if(OTN<0.5){KK=0.6;} else {if(OTN<0.7){KK=0.8;} else {if(OTN<0.9){KK=0.9;} else {if(OTN<1.5){KK=1;} else {if(OTN<3){KK=1.4;} else {if(OTN<5){KK=1.9;} else {if(OTN<7){KK=2.4;} else {KK=2.7;}}}}}}}}
} else {
  if ( VSP == "isothermy" ) {
    if (OTN<0.3){KK=0.4;} else{if(OTN<0.5){KK=0.6;} else {if(OTN<0.7){KK=0.8;} else {if(OTN<0.9){KK=0.9;} else {if(OTN<1.5){KK=1;} else {if(OTN<3){KK=1.5;} else {if(OTN<5){KK=2.2;} else {if(OTN<7){KK=2.8;} else {KK=3.3;}}}}}}}}
  } else {
    if ( VSP == "inversion" ) {
      if (OTN<0.3){KK=0.3;} else{if(OTN<0.5){KK=0.5;} else {if(OTN<0.7){KK=0.7;} else {if(OTN<0.9){KK=0.9;} else {if(OTN<1.5){KK=1;} else {if(OTN<3){KK=1.6;} else {if(OTN<5){KK=2.6;} else {if(OTN<7){KK=3.4;} else {KK=4;}}}}}}}}
    } else {alert("ERROR 2 !!!!!!!!!!!!")}}}

  // Расчет чения коэффициента влияния температуры на глубину распространения первичного и вторичного облака СДЯВ
  if ( SDOR == "chlorine" ) { // для хлора
    if (VOLUME < 700) { // При храннии в сжатом состоянии
      if(T<= -38.5){KT1=0; KT2=0.5;} else {if(T <= -32.5){KT1=0.15; KT2=0.55;} else {if(T<= -27.5){KT1=0.3; KT2=0.6;} else {if(T<= -22.5){KT1=0.4; KT2=0.6;} else {if(T<= -17.5){KT1=0.5; KT2=0.6;} else {if(T<= -12.5){KT1=0.6; KT2=0.65;} else {if(T<=-7.5){KT1=0.7; KT2=0.7;} else {if(T<= -2.5){KT1=0.75; KT2=0.75;} else {if(T<= 2.5){KT1=0.8; KT2=0.8;} else {if(T<=7.5){KT1=0.85; KT2=0.85;} else {if(T<=12.5){KT1=0.9; KT2=0.9;} else {if(T<=17.5){KT1=0.95; KT2=0.95;} else {if(T<=22.5){KT1=1; KT2=1;} else {if(T<=27.5){KT1=1.05; KT2=1.05;} else {if(T<=32.5){KT1=1.1; KT2=1.1;} else {if(T<=37.5){KT1=1.15; KT2=1.15;} else {KT1=1.2; KT2=1.2;}}}}}}}}}}}}}}}}
    } else {  // При хранении в жидком состоянии (изотермический способ хранения)
      if(T<= -38.5){KT1=0;KT2=0.4;} else {if(T <= -32.5){KT1=0.05; KT2=0.45;} else {if(T<= -27.5){KT1=0.1; KT2=0.5;} else {if(T<= -22.5){KT1=0.15; KT2=0.55;} else {if(T<= -17.5){KT1=0.2; KT2=0.6;} else {if(T<= -12.5){KT1=0.3; KT2=0.65;} else {if(T<=-7.5){KT1=0.4; KT2=0.7;} else {if(T<= -2.5){KT1=0.5; KT2=0.75;} else {if(T<= 2.5){KT1=0.6; KT2=0.8;} else {if(T<=7.5){KT1=0.7; KT2=0.85;} else {if(T<=12.5){KT1=0.8; KT2=0.9;} else {if(T<=17.5){KT1=0.9; KT2=0.95;} else {if(T<=22.5){KT1=1; KT2=1;} else {if(T<=27.5){KT1=1.1; KT2=1.1;} else {if(T<=32.5){KT1=1.2; KT2=1.2;} else {if(T<=37.5){KT1=1.25; KT2=1.25;} else {KT1=1.3; KT2=1.3;}}}}}}}}}}}}}}}}
    }
  } else {
    if ( SDOR == "carbonOxide" ) {KT1=1; KT2=0;} else {
    if ( SDOR == "hydrazine" ) {KT1=0; KT2=0;} else {
    if ( SDOR == "phosgene" ) {
      if(T<= -38.5){KT1=0;KT2=0.3;} else {if(T <= -32.5){KT1=0; KT2=0.35;} else {if(T<= -27.5){KT1=0; KT2=0.4;} else {if(T<= -22.5){KT1=0; KT2=0.45;} else {if(T<= -17.5){KT1=0; KT2=0.5;} else {if(T<= -12.5){KT1=0; KT2=0.55;} else {if(T<=-7.5){KT1=0; KT2=0.6;} else {if(T<= -2.5){KT1=0; KT2=0.65;} else {if(T<= 2.5){KT1=0; KT2=0.7;} else {if(T<=7.5){KT1=0.2; KT2=0.8;} else {if(T<=12.5){KT1=0.4; KT2=0.9;} else {if(T<=17.5){KT1=0.7; KT2=0.95;} else {if(T<=22.5){KT1=1; KT2=1;} else {if(T<=27.5){KT1=1.25; KT2=1.1;} else {if(T<=32.5){KT1=1.5; KT2=1.2;} else {if(T<=37.5){KT1=1.65; KT2=1.25;} else {KT1=1.8; KT2=1.3;}}}}}}}}}}}}}}}}
    } else { if ( SDOR == "ammonia" ) {
      if (VOLUME < 3000) { // При храннии в сжатом состоянии
        if(T<= -38.5){KT1=0; KT2=0.5;} else {if(T <= -32.5){KT1=0.15; KT2=0.55;} else {if(T<= -27.5){KT1=0.3; KT2=0.6;} else {if(T<= -22.5){KT1=0.4; KT2=0.6;} else {if(T<= -17.5){KT1=0.5; KT2=0.6;} else {if(T<= -12.5){KT1=0.6; KT2=0.65;} else {if(T<=-7.5){KT1=0.7; KT2=0.7;} else {if(T<= -2.5){KT1=0.75; KT2=0.75;} else {if(T<= 2.5){KT1=0.8; KT2=0.8;} else {if(T<=7.5){KT1=0.85; KT2=0.85;} else {if(T<=12.5){KT1=0.9; KT2=0.9;} else {if(T<=17.5){KT1=0.95; KT2=0.95;} else {if(T<=22.5){KT1=1; KT2=1;} else {if(T<=27.5){KT1=1.05; KT2=1.05;} else {if(T<=32.5){KT1=1.1; KT2=1.1;} else {if(T<=37.5){KT1=1.15; KT2=1.15;} else {KT1=1.2; KT2=1.2;}}}}}}}}}}}}}}}}
      } else { // При хранении в жидком состоянии (изотермический способ хранения)
        if(T<= -38.5){KT1=0;KT2=0.4;} else {if(T <= -32.5){KT1=0.05; KT2=0.45;} else {if(T<= -27.5){KT1=0.1; KT2=0.5;} else {if(T<= -22.5){KT1=0.15; KT2=0.55;} else {if(T<= -17.5){KT1=0.2; KT2=0.6;} else {if(T<= -12.5){KT1=0.3; KT2=0.65;} else {if(T<=-7.5){KT1=0.4; KT2=0.7;} else {if(T<= -2.5){KT1=0.5; KT2=0.75;} else {if(T<= 2.5){KT1=0.6; KT2=0.8;} else {if(T<=7.5){KT1=0.7; KT2=0.85;} else {if(T<=12.5){KT1=0.8; KT2=0.9;} else {if(T<=17.5){KT1=0.9; KT2=0.95;} else {if(T<=22.5){KT1=1; KT2=1;} else {if(T<=27.5){KT1=1.1; KT2=1.1;} else {if(T<=32.5){KT1=1.2; KT2=1.2;} else {if(T<=37.5){KT1=1.25; KT2=1.25;} else {KT1=1.3; KT2=1.3;}}}}}}}}}}}}}}}}
      }
    }
  }}}
  };
  // Расчет коэфициента рассеивания СДЯВ за счет рельефа местности и растительности на ней
  if ( RELIEF == "plainFlat" ) {
    if ( VEGET == "taigaNeedles" ){KR=1.1;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "foliage" ){KR=0.9;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "notFoliage" ){KR=0.6;} else {if ( VEGET == "forestNeedles" ){KR=0.9;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "foliage" ){KR=0.6;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "notFoliage" ){KR=0.4;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "foliage" ){KR=0.6;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "notFoliage" ){KR=0.5;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "foliage" ){KR=0.4;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "notFoliage" ){KR=0.2;} else {if ( VEGET == "steppe" && FOLIAGE == "foliage" ){KR=0.3;} else {if ( VEGET == "steppe" && FOLIAGE == "notFoliage" ){KR=0.1;} else {if ( VEGET == "semidesert" && FOLIAGE == "foliage" ){KR=0.1;} else {if ( VEGET == "semidesert" && FOLIAGE == "notFoliage" ){KR=0.05;} else {if ( VEGET == "desert" ){KR=0.01;}}}}}}}}}}}}}}}
  } else {
    if ( RELIEF == "plainWave" ){
      if ( VEGET == "taigaNeedles" ){KR=1.3;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "foliage" ){KR=1;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "notFoliage" ){KR=0.7;} else {if ( VEGET == "forestNeedles" ){KR=1.1;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "foliage" ){KR=0.8;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "notFoliage" ){KR=0.6;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "foliage" ){KR=0.8;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "notFoliage" ){KR=0.7;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "foliage" ){KR=0.6;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "notFoliage" ){KR=0.3;} else {if ( VEGET == "steppe" && FOLIAGE == "foliage" ){KR=0.4;} else {if ( VEGET == "steppe" && FOLIAGE == "notFoliage" ){KR=0.2;} else {if ( VEGET == "semidesert" && FOLIAGE == "foliage" ){KR=0.2;} else {if ( VEGET == "semidesert" && FOLIAGE == "notFoliage" ){KR=0.1;} else {if ( VEGET == "desert" ){KR=0.1;}}}}}}}}}}}}}}}
    } else {
      if ( RELIEF == "plainHill" ){
        if ( VEGET == "taigaNeedles" ){KR=1.4;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "foliage" ){KR=1.1;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "notFoliage" ){KR=0.9;} else {if ( VEGET == "forestNeedles" ){KR=1.2;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "foliage" ){KR=0.9;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "notFoliage" ){KR=0.7;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "foliage" ){KR=1;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "notFoliage" ){KR=0.8;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "foliage" ){KR=0.8;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "notFoliage" ){KR=0.5;} else {if ( VEGET == "steppe" && FOLIAGE == "foliage" ){KR=0.7;} else {if ( VEGET == "steppe" && FOLIAGE == "notFoliage" ){KR=0.4;} else {if ( VEGET == "semidesert" && FOLIAGE == "foliage" ){KR=0.4;} else {if ( VEGET == "semidesert" && FOLIAGE == "notFoliage" ){KR=0.3;} else {if ( VEGET == "desert" ){KR=0.3;}}}}}}}}}}}}}}}
    } else {
      if ( RELIEF == "ravine" ){
        if ( VEGET == "taigaNeedles" ){KR=1.5;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "foliage" ){KR=1.3;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "notFoliage" ){KR=1;} else {if ( VEGET == "forestNeedles" ){KR=1.3;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "foliage" ){KR=1;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "notFoliage" ){KR=0.8;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "foliage" ){KR=1.1;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "notFoliage" ){KR=0.9;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "foliage" ){KR=0.9;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "notFoliage" ){KR=0.6;} else {if ( VEGET == "steppe" && FOLIAGE == "foliage" ){KR=0.8;} else {if ( VEGET == "steppe" && FOLIAGE == "notFoliage" ){KR=0.5;} else {if ( VEGET == "semidesert" && FOLIAGE == "foliage" ){KR=0.5;} else {if ( VEGET == "semidesert" && FOLIAGE == "notFoliage" ){KR=0.5;} else {if ( VEGET == "desert" ){KR=0.5;}}}}}}}}}}}}}}}
    } else {
      if ( RELIEF == "hills" ){
        if ( VEGET == "taigaNeedles" ){KR=1.6;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "foliage" ){KR=1.5;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "notFoliage" ){KR=1.3;} else {if ( VEGET == "forestNeedles" ){KR=1.4;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "foliage" ){KR=1;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "notFoliage" ){KR=0.9;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "foliage" ){KR=1.2;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "notFoliage" ){KR=1;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "foliage" ){KR=0.9;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "notFoliage" ){KR=0.7;} else {if ( VEGET == "steppe" && FOLIAGE == "foliage" ){KR=0.8;} else {if ( VEGET == "steppe" && FOLIAGE == "notFoliage" ){KR=0.6;} else {if ( VEGET == "semidesert" && FOLIAGE == "foliage" ){KR=0.6;} else {if ( VEGET == "semidesert" && FOLIAGE == "notFoliage" ){KR=0.6;} else {if ( VEGET == "desert" ){KR=0.6;}}}}}}}}}}}}}}}
    } else {
      if ( RELIEF == "footHills" ){
        if ( VEGET == "taigaNeedles" ){KR=2;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "foliage" ){KR=1.8;} else {if ( VEGET == "taigaFoliage" && FOLIAGE == "notFoliage" ){KR=1.5;} else {if ( VEGET == "forestNeedles" ){KR=1.6;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "foliage" ){KR=1.2;} else {if ( VEGET == "forestFoliage" && FOLIAGE == "notFoliage" ){KR=1.1;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "foliage" ){KR=1.5;} else {if ( VEGET == "forestSteppeNeedles" && FOLIAGE == "notFoliage" ){KR=1.3;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "foliage" ){KR=1.1;} else {if ( VEGET == "forestSteppeFoliage" && FOLIAGE == "notFoliage" ){KR=1;} else {if ( VEGET == "steppe" && FOLIAGE == "foliage" ){KR=1;} else {if ( VEGET == "steppe" && FOLIAGE == "notFoliage" ){KR=0.9;} else {if ( VEGET == "semidesert" && FOLIAGE == "foliage" ){KR=0.8;} else {if ( VEGET == "semidesert" && FOLIAGE == "notFoliage" ){KR=0.8;} else {if ( VEGET == "desert" ){KR=0.8;}}}}}}}}}}}}}}}
    }}}}}};
// Расчет коэфициента влияния местности Км
if (VSP == "convection"){
if (KR<0.075){KM=1;} else {if (KR<0.15){KM=0.8;} else {if(KR<0.3){KM=0.5;} else{if(KR<0.5){KM=0.3;} else{if(KR<0.7){KM=0.3;} else {if(KR<0.9){KM=0.2;} else{if(KR<1.1){KM=0.1;} else {if(KR<1.3){KM=0.1;} else {if(KR<1.5){KM=0.05;} else{if(KR<1.7){KM=0.05;} else{if(KR<1.9){KM=0.03;} else{KM=0.02;}}}}}}}}}}}
} else {
if (VSP == "isothermy"){
if (KR<0.075){KM=1;} else {if (KR<0.15){KM=0.8;} else {if(KR<0.3){KM=0.6;} else{if(KR<0.5){KM=0.4;} else{if(KR<0.7){KM=0.3;} else {if(KR<0.9){KM=0.3;} else{if(KR<1.1){KM=0.2;} else {if(KR<1.3){KM=0.1;} else {if(KR<1.5){KM=0.05;} else{if(KR<1.7){KM=0.05;} else{if(KR<1.9){KM=0.02;} else{KM=0.01;}}}}}}}}}}}
} else {
if (VSP == "inversion") {
  if (KR<0.075){KM=1;} else {if (KR<0.15){KM=0.9;} else {if(KR<0.3){KM=0.6;} else{if(KR<0.5){KM=0.5;} else{if(KR<0.7){KM=0.4;} else {if(KR<0.9){KM=0.4;} else{if(KR<1.1){KM=0.3;} else {if(KR<1.3){KM=0.1;} else {if(KR<1.5){KM=0.05;} else{if(KR<1.7){KM=0.05;} else{if(KR<1.9){KM=0.03;} else{KM=0.03;}}}}}}}}}}}
}
}
};
//  Рачет глубины распостранения первичного и вторичного облака СДЯВ
G1 = G1T * KT1 * KK * KM;
G1 = G1.toFixed(2);
if (SDOR == "chlorine" || SDOR == "ammonia" || SDOR == "phosgene") {G2 = G2T * KT1 * KK * KM;} else {
if ( SDOR == "carbonOxide" || SDOR == "hydrazine") {G2=0.5;} // Необходимо еще для СИНИЛЬНОЙ КИСЛОТЫ и ОКСИДА ЭТИЛЕНА???????????
}
G2 = G2.toFixed(2);
// расчет радиуса аварии
if ( SDOR == "chlorine" || SDOR == "ammonia" || SDOR == "phosgene" || SDOR == "hydrazine" || SDOR == "cyanide" || SDOR == "carbonOxide" || SDOR == "ethyleneOxide" ){
if ( VOLUME < 100 ) {RA = 0.5;} else {RA=1;}
}
// расчет угла Фи 1
if ( VSP == "inversion" ){
if ( PROB == 0.5 ){FI1=9;} else {if(PROB == 0.75){FI1=15;} else {FI1=20;}}
} else {
if ( VSP == "isothermy" ){
if ( PROB == 0.5 ){FI1=12;} else {if(PROB == 0.75){FI1=20;} else {FI1=25;}}
} else {
if ( VSP == "convection" ){
  if ( PROB == 0.5 ){FI1=15;} else {if(PROB == 0.75){FI1=25;} else {FI1=30;}}
}}}
// Определение времени испарения СДЯВ (без учета наличия поддона для некоторых емкостей)!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // для ХЛОРА
    if ( SDOR == "chlorine" ){
      if ( VOLUME < 5 ){if(T<-35){TIMEEVA=12;}else{if(T<-25){TIMEEVA=10.3;}else{if(T<-15){TIMEEVA=8.6;}else{if(T<-5){TIMEEVA=6.9;}else{if(T<5){TIMEEVA=6;} else{if(T<15){TIMEEVA=5.1;}else{if(T<25){TIMEEVA=4.6;}else {if(T<35){TIMEEVA=3.8;}else{TIMEEVA=3.3;}}}}}}}}} else {
      if ( VOLUME < 20 ){if(T<-35){TIMEEVA=13.9;}else{if(T<-25){TIMEEVA=11.9;}else{if(T<-15){TIMEEVA=9.9;}else{if(T<-5){TIMEEVA=7.9;}else{if(T<5){TIMEEVA=6.9;} else{if(T<15){TIMEEVA=5.9;}else{if(T<25){TIMEEVA=5.4;}else {if(T<35){TIMEEVA=4.4;}else{TIMEEVA=3.8;}}}}}}}}} else {
      if ( VOLUME < 40 ){if(T<-35){TIMEEVA=15.3;}else{if(T<-25){TIMEEVA=13.1;}else{if(T<-15){TIMEEVA=10.9;}else{if(T<-5){TIMEEVA=8.7;}else{if(T<5){TIMEEVA=7.6;} else{if(T<15){TIMEEVA=6.5;}else{if(T<25){TIMEEVA=5.9;}else {if(T<35){TIMEEVA=4.9;}else{TIMEEVA=4.3;}}}}}}}}} else {
      if ( VOLUME < 60 ){if(T<-35){TIMEEVA=15.5;}else{if(T<-25){TIMEEVA=13.3;}else{if(T<-15){TIMEEVA=11.1;}else{if(T<-5){TIMEEVA=8.9;}else{if(T<5){TIMEEVA=7.8;} else{if(T<15){TIMEEVA=6.7;}else{if(T<25){TIMEEVA=6.1;}else {if(T<35){TIMEEVA=5;}else{TIMEEVA=4.4;}}}}}}}}} else {
      if ( VOLUME < 125 ){if(T<-35){TIMEEVA=206.4;}else{if(T<-25){TIMEEVA=175.2;}else{if(T<-15){TIMEEVA=151.2;}else{if(T<-5){TIMEEVA=127.2;}else{if(T<5){TIMEEVA=112.8;} else{if(T<15){TIMEEVA=98.4;}else{if(T<25){TIMEEVA=81.6;}else {if(T<35){TIMEEVA=74.4;}else{TIMEEVA=62.4;}}}}}}}}} else {
      if ( VOLUME < 225 ){if(T<-35){TIMEEVA=230.4;}else{if(T<-25){TIMEEVA=194.4;}else{if(T<-15){TIMEEVA=168;}else{if(T<-5){TIMEEVA=144;}else{if(T<5){TIMEEVA=124.8;} else{if(T<15){TIMEEVA=105.6;}else{if(T<25){TIMEEVA=93.6;}else {if(T<35){TIMEEVA=81.6;}else{TIMEEVA=69.6;}}}}}}}}} else {
      if ( VOLUME < 500 ){if(T<-35){TIMEEVA=271.2;}else{if(T<-25){TIMEEVA=230.4;}else{if(T<-15){TIMEEVA=199.2;}else{if(T<-5){TIMEEVA=168;}else{if(T<5){TIMEEVA=148.8;} else{if(T<15){TIMEEVA=124.8;}else{if(T<25){TIMEEVA=108;}else {if(T<35){TIMEEVA=98.4;}else{TIMEEVA=81.6;}}}}}}}}} else {
      if ( VOLUME < 875 ){if(T<-35){TIMEEVA=321.6;}else{if(T<-25){TIMEEVA=273.6;}else{if(T<-15){TIMEEVA=228;}else{if(T<-5){TIMEEVA=201.6;}else{if(T<5){TIMEEVA=177.6;} else{if(T<15){TIMEEVA=153.6;}else{if(T<25){TIMEEVA=139.2;}else {if(T<35){TIMEEVA=115.2;}else{TIMEEVA=98.4;}}}}}}}}} else {
      if ( VOLUME < 1500 ){if(T<-35){TIMEEVA=352.8;}else{if(T<-25){TIMEEVA=300;}else{if(T<-15){TIMEEVA=261.6;}else{if(T<-5){TIMEEVA=220.8;}else{if(T<5){TIMEEVA=194.4;} else{if(T<15){TIMEEVA=168;}else{if(T<25){TIMEEVA=144;}else {if(T<35){TIMEEVA=127.2;}else{TIMEEVA=108;}}}}}}}}} else {
      if ( VOLUME >= 1500 ){if(T<-35){TIMEEVA=403.2;}else{if(T<-25){TIMEEVA=345.6;}else{if(T<-15){TIMEEVA=300;}else{if(T<-5){TIMEEVA=252;}else{if(T<5){TIMEEVA=220.8;} else{if(T<15){TIMEEVA=189.6;}else{if(T<25){TIMEEVA=158.4;}else {if(T<35){TIMEEVA=144;}else{TIMEEVA=127.2;}}}}}}}}}
      }}}}}}}}}
    }
    // для аммиака
    if ( SDOR == "ammonia" ){
      if ( VOLUME < 40 ){if(T<-35){TIMEEVA=28.8;}else{if(T<-25){TIMEEVA=24;}else{if(T<-15){TIMEEVA=20;}else{if(T<-5){TIMEEVA=17;}else{if(T<5){TIMEEVA=15;} else{if(T<15){TIMEEVA=13;}else{if(T<25){TIMEEVA=11;}else {if(T<35){TIMEEVA=9.4;}else{TIMEEVA=7.8;}}}}}}}}} else {
      if ( VOLUME < 51 ){if(T<-35){TIMEEVA=31.2;}else{if(T<-25){TIMEEVA=26.4;}else{if(T<-15){TIMEEVA=21.7;}else{if(T<-5){TIMEEVA=18.3;}else{if(T<5){TIMEEVA=16;} else{if(T<15){TIMEEVA=13.4;}else{if(T<25){TIMEEVA=11.3;}else {if(T<35){TIMEEVA=10;}else{TIMEEVA=8.6;}}}}}}}}} else {
      if ( VOLUME < 125 ){if(T<-35){TIMEEVA=439.2;}else{if(T<-25){TIMEEVA=369.6;}else{if(T<-15){TIMEEVA=302.4;}else{if(T<-5){TIMEEVA=273.6;}else{if(T<5){TIMEEVA=223.2;} else{if(T<15){TIMEEVA=182.4;}else{if(T<25){TIMEEVA=151.2;}else {if(T<35){TIMEEVA=132;}else{TIMEEVA=112.8;}}}}}}}}} else {
      if ( VOLUME < 225 ){if(T<-35){TIMEEVA=487.2;}else{if(T<-25){TIMEEVA=412.8;}else{if(T<-15){TIMEEVA=336;}else{if(T<-5){TIMEEVA=288;}else{if(T<5){TIMEEVA=240;} else{if(T<15){TIMEEVA=206.4;}else{if(T<25){TIMEEVA=168;}else {if(T<35){TIMEEVA=144;}else{TIMEEVA=120;}}}}}}}}} else {
      if ( VOLUME < 400 ){if(T<-35){TIMEEVA=576;}else{if(T<-25){TIMEEVA=487.2;}else{if(T<-15){TIMEEVA=400.8;}else{if(T<-5){TIMEEVA=343.2;}else{if(T<5){TIMEEVA=280.8;} else{if(T<15){TIMEEVA=240;}else{if(T<25){TIMEEVA=201.6;}else {if(T<35){TIMEEVA=175.2;}else{TIMEEVA=148.8;}}}}}}}}} else {
      if ( VOLUME < 750 ){if(T<-35){TIMEEVA=648;}else{if(T<-25){TIMEEVA=556.8;}else{if(T<-15){TIMEEVA=446.4;}else{if(T<-5){TIMEEVA=381.6;}else{if(T<5){TIMEEVA=314.4;} else{if(T<15){TIMEEVA=271.2;}else{if(T<25){TIMEEVA=225.6;}else {if(T<35){TIMEEVA=199.2;}else{TIMEEVA=168;}}}}}}}}} else {
      if ( VOLUME < 1500 ){if(T<-35){TIMEEVA=720;}else{if(T<-25){TIMEEVA=633.6;}else{if(T<-15){TIMEEVA=516;}else{if(T<-5){TIMEEVA=439.2;}else{if(T<5){TIMEEVA=364.8;} else{if(T<15){TIMEEVA=314.4;}else{if(T<25){TIMEEVA=264;}else {if(T<35){TIMEEVA=228;}else{TIMEEVA=192;}}}}}}}}} else {
      if ( VOLUME < 5000 ){if(T<-35){TIMEEVA=720;}else{if(T<-25){TIMEEVA=720;}else{if(T<-15){TIMEEVA=595.2;}else{if(T<-5){TIMEEVA=504;}else{if(T<5){TIMEEVA=420;} else{if(T<15){TIMEEVA=362.4;}else{if(T<25){TIMEEVA=302.4;}else {if(T<35){TIMEEVA=264;}else{TIMEEVA=225.6;}}}}}}}}} else {
      if ( VOLUME < 20000 ){if(T<-35){TIMEEVA=720;}else{if(T<-25){TIMEEVA=720;}else{if(T<-15){TIMEEVA=720;}else{if(T<-5){TIMEEVA=681.6;}else{if(T<5){TIMEEVA=564;} else{if(T<15){TIMEEVA=487.2;}else{if(T<25){TIMEEVA=408;}else {if(T<35){TIMEEVA=360;}else{TIMEEVA=312;}}}}}}}}} else {
      if ( VOLUME >= 20000 ){if(T<-35){TIMEEVA=720;}else{if(T<-25){TIMEEVA=720;}else{if(T<-15){TIMEEVA=720;}else{if(T<-5){TIMEEVA=720;}else{if(T<5){TIMEEVA=676.8;} else{if(T<15){TIMEEVA=583.2;}else{if(T<25){TIMEEVA=489.6;}else {if(T<35){TIMEEVA=427.2;}else{TIMEEVA=360;}}}}}}}}}
      }}}}}}}}}
    }
    // для ФОСГЕНА
    if ( SDOR == "phosgene" ){
      if ( VOLUME < 7.5 ){if(T<-35){TIMEEVA=18;}else{if(T<-25){TIMEEVA=14.4;}else{if(T<-15){TIMEEVA=10.8;}else{if(T<-5){TIMEEVA=9;}else{if(T<5){TIMEEVA=7.2;} else{if(T<15){TIMEEVA=6.3;}else{if(T<25){TIMEEVA=5.4;}else {if(T<35){TIMEEVA=4.3;}else{TIMEEVA=3.2;}}}}}}}}} else {
      if ( VOLUME < 20 ){if(T<-35){TIMEEVA=18.6;}else{if(T<-25){TIMEEVA=14.9;}else{if(T<-15){TIMEEVA=11.2;}else{if(T<-5){TIMEEVA=9.3;}else{if(T<5){TIMEEVA=7.4;} else{if(T<15){TIMEEVA=6.5;}else{if(T<25){TIMEEVA=5.6;}else {if(T<35){TIMEEVA=4.5;}else{TIMEEVA=3.4;}}}}}}}}} else {
      if ( VOLUME < 40 ){if(T<-35){TIMEEVA=20.1;}else{if(T<-25){TIMEEVA=16.1;}else{if(T<-15){TIMEEVA=12.1;}else{if(T<-5){TIMEEVA=10.1;}else{if(T<5){TIMEEVA=8.1;} else{if(T<15){TIMEEVA=7.1;}else{if(T<25){TIMEEVA=6.1;}else {if(T<35){TIMEEVA=4.9;}else{TIMEEVA=3.7;}}}}}}}}} else {
      if ( VOLUME < 51 ){if(T<-35){TIMEEVA=21.1;}else{if(T<-25){TIMEEVA=16.9;}else{if(T<-15){TIMEEVA=12.7;}else{if(T<-5){TIMEEVA=10.6;}else{if(T<5){TIMEEVA=8.5;} else{if(T<15){TIMEEVA=7.4;}else{if(T<25){TIMEEVA=6.3;}else {if(T<35){TIMEEVA=5;}else{TIMEEVA=3.8;}}}}}}}}} else {
      if ( VOLUME < 125 ){if(T<-35){TIMEEVA=326.4;}else{if(T<-25){TIMEEVA=264;}else{if(T<-15){TIMEEVA=194.4;}else{if(T<-5){TIMEEVA=158.4;}else{if(T<5){TIMEEVA=124.8;} else{if(T<15){TIMEEVA=105.6;}else{if(T<25){TIMEEVA=81.6;}else {if(T<35){TIMEEVA=69.6;}else{TIMEEVA=55.2;}}}}}}}}} else {
      if ( VOLUME < 200 ){if(T<-35){TIMEEVA=362.4;}else{if(T<-25){TIMEEVA=292.8;}else{if(T<-15){TIMEEVA=218.4;}else{if(T<-5){TIMEEVA=180;}else{if(T<5){TIMEEVA=136.8;} else{if(T<15){TIMEEVA=112.8;}else{if(T<25){TIMEEVA=88.8;}else {if(T<35){TIMEEVA=76.8;}else{TIMEEVA=62.4;}}}}}}}}} else {
      if ( VOLUME >= 200 ){if(T<-35){TIMEEVA=398.4;}else{if(T<-25){TIMEEVA=321.6;}else{if(T<-15){TIMEEVA=240;}else{if(T<-5){TIMEEVA=199.2;}else{if(T<5){TIMEEVA=151.2;} else{if(T<15){TIMEEVA=124.8;}else{if(T<25){TIMEEVA=98.4;}else {if(T<35){TIMEEVA=84;}else{TIMEEVA=69.6;}}}}}}}}}
    }}}}}}
    }
    // для ГИДРАЗИНА
    if ( SDOR == "hydrazine" ){
      if ( VOLUME < 40 ){if(T<15){TIMEEVA=720;}else{if(T<25){TIMEEVA=480;}else{if(T<35){TIMEEVA=336;}else{TIMEEVA=201.6;}}}} else {
      if ( VOLUME < 75 ){if(T<15){TIMEEVA=720;}else{if(T<25){TIMEEVA=504;}else{if(T<35){TIMEEVA=3606;}else{TIMEEVA=206;}}}} else {
        TIMEEVA=720;}}
    }

    // расчет угла Фи 2
    if ( TIMEEVA < 2){FI2=FI1;}
    if ( TIMEEVA >= 2 && TIMEEVA < 6 ){
      if ( VSP == "inversion" ){if (PROB == 0.5){FI2=12;} else { if(PROB == 0.75){FI2=20;}else{if(PROB == 0.9){FI2=30;}}}} else {
      if ( VSP == "isothermy" ){ if(PROB == 0.5){FI2=15;} else { if(PROB == 0.75){FI2=25;}else{if(PROB == 0.9){FI2=40;}}}} else {
      if ( VSP == "convection" ){ if(PROB == 0.5){FI2=20;} else { if(PROB == 0.75){FI2=35;}else{if(PROB == 0.9){FI2=50;}}}}
    }}} else {
    if ( TIMEEVA >= 6 && TIMEEVA < 12 ) {if (PROB == 0.5){FI2=22;} else { if(PROB == 0.75){FI2=37;}else{if(PROB == 0.9){FI2=52;}}}} else {
      if ( TIMEEVA >= 12 && TIMEEVA >= 24 ) {if (PROB == 0.5){FI2=30;} else { if(PROB == 0.75){FI2=50;}else{if(PROB == 0.9){FI2=70;}}}}
    }}


    // Рачет площади зоны распространения первичного облака СДЯВ
    G1 = Number(G1);
    S1 = G1 + RA;
    S1 = S1*S1*FI1/60;
    S1 = S1.toFixed(2);
    G2 = Number(G2);
    S2 = G2 + RA;
    S2 = S2*S2*FI2/60;
    S2 = S2.toFixed(2);




    alert("Глубина распостранения первичного облака (табличное значение) " + G1T + " км" + "\n" + "Глубина распостранения вторичного облака (табличное значение) " + G2T + " км" + "\n" + "Коэффициент пропорциональности Кк равен  " + KK + "\n" + "Коэффициент Kt1 равен " + KT1 + "\n" + "Коэффициент Kt2 равен " + KT2 + "\n" + "Коэффициент рассеивания СДЯВ равен  " + KR + "\n" + "Коэффициент влияния местности составляет  " + KM + "\n" + "Глубина распространения первичного облака СДЯВ составляет  " + G1 + " км" + "\n" + "Глубина распространения вторичного облака СДЯВ составляет  " + G2 + " км" + "\n" + "Радиус аварии равен  " + RA + " км" + "\n" + "Угол Фі1 равен " + FI1 + "\n" + "Угол Фі2 равен " + FI2 + "\n" + "Время испарения СДЯВ с площади разлива при скорости ветра 1 м/с составляет  " + TIMEEVA + " часов" + "\n" + "S1 = " + S1 + " км кватратных" + "\n" + "S2 = " + S2 + " км кватратных");

};



    $(document).ready(function(){
      $('#calc').bind("click", calculation);
    });
