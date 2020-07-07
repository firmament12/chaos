$(function(){
// Isotope
  $('#container').isotope({
    itemSelector: '.item',
    layoutMode: 'fitRows'
  });
  var $container = $('#container').isotope();
  var currentValue = $('#five').attr('data-filter');
  $container.isotope({ filter: currentValue });
  $('#filters').on('click','button',function(){
    var filterValue = $(this).attr('data-filter');
    $container.isotope({ filter: filterValue });
  });

// anime
  $(window).scrollTop(0);
  $(".mainSite").css("display", "none");
  $(".mainSite").css({opacity:'0'});
  setTimeout(function(){
    $(".mainSite").css("display", "block");
    $(".mainSite").stop().animate({opacity:'1'},400);
  },3000);
  setTimeout(function(){
    $(".anime").slideUp(1000);
  },2000);
});

// スライダーに表示する画像のパス
var imgList1 = [
    'img/main_visual01.jpg','img/main_visual02.jpg',
    'img/main_visual03.jpg','img/main_visual04.jpg',
    'img/main_visual05.jpg'
];
var imgList2 = [
    'img/main_visual06.jpg','img/main_visual07.jpg',
    'img/main_visual08.jpg','img/main_visual09.jpg',
    'img/main_visual10.jpg'
];
var imgList3 = [
    'img/main_visual11.jpg','img/main_visual12.jpg',
    'img/main_visual13.jpg','img/main_visual14.jpg',
    'img/main_visual15.jpg'
];
var imgList4 = [
    'img/main_visual16.jpg','img/main_visual17.jpg',
    'img/main_visual18.jpg','img/main_visual19.jpg',
    'img/main_visual20.jpg'
];
// スライダーに表示する画像のグループを午前午後x奇数偶数日用意する
    var today = new Date();
    var date = today.getDate();
    var hour = today.getHours();
    var images = [imgList1,imgList2,imgList3,imgList4];
    var ans = 0;
    switch (hour) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        if (date % 2 === 1) {
          ans = 0;
        } else {
          ans = 2;
        }
        break;
        default:
        if (date % 2 === 1) {
          ans = 1;
        } else {
          ans = 3;
        }
    }
    var mv = images[ans]
// 画像とナビの要素を自動で追加
    var document = '';
for (var i = 0; i < mv.length; i++) {
    // li要素を取得
    var slide = document.createElement('li');
    // li要素の中に画像タグを埋め込む
    slide.innerHTML = '<img src="' +mv[i]+ '">';
    // li要素をクラス名「slider-inner」の子要素として追加
    document.getElementsByClassName('slider-inner')[0].appendChild(slide);
    
    // li要素を取得
    var nav = document.createElement('li');
    // プロパティ「data-nav-index」に数値を割り振る
    nav.setAttribute('data-nav-index', i);
    // li要素をクラス名「nav」の子要素として追加
    document.getElementsByClassName('nav')[0].appendChild(nav);
}
// スライドの数を取得(処理のために-1する)
    var length = mv.length -1;
// クラス名「imageSlide」に画像の1枚の要素を格納
    var imageSlide = document.getElementsByClassName('slider-inner')[0].getElementsByTagName('li');
// クラス名「dotNavigation」にドットナビの1つの要素を格納
    var dotNavigation = document.getElementsByClassName('nav')[0].getElementsByTagName('li');
// 「現在○○枚目のスライドを表示している」というインデックス番号を格納する変数
    var nowIndex = 0;
// 現在表示されている画像とドットナビにクラス名を付ける
    imageSlide[nowIndex].classList.add('show');
    dotNavigation[nowIndex].classList.add('current');
// スライドがアニメーション中か判断するフラグ
    var isChanging = false;
// スライドのsetTimeoutを管理するタイマー
    var slideTimer;
// スライド切り替え時に呼び出す関数
function sliderSlide(val) {
    if (isChanging === true) {
      return false;
    }
    isChanging = true;
  // 現在表示している画像とナビからクラス名を削除
    imageSlide[nowIndex].classList.remove('show');
    dotNavigation[nowIndex].classList.remove('current');
    nowIndex = val;
  // 次に表示する画像とナビにクラス名を付与
    imageSlide[nowIndex].classList.add('show');
    dotNavigation[nowIndex].classList.add('current');
  // アニメーションが終わるタイミングでisChangingのステータスをfalseに
    slideTimer = setTimeout(function(){
     isChanging = false;
    }, 600);
}
// 左矢印のナビをクリックした時のイベント
    document.getElementById('arrow-prev').addEventListener('click', function(){
     var index = nowIndex -1;
     if (index < 0) {
     index = length;
     }
     sliderSlide(index);
    }, false);
// 右矢印のナビをクリックした時のイベント
    document.getElementById('arrow-next').addEventListener('click', function(){
     var index = nowIndex +1;
     if (index > length) {
     index = 0;
     }
     sliderSlide(index);
    }, false);
// ドットナビをクリックした時のイベントを作成
    for (var j = 0; j < dotNavigation.length; j++) {
// データ属性のインデックス番号を元にスライドを行う
    dotNavigation[j].addEventListener('click', function(){
     var index = Number(this.getAttribute('data-nav-index'));
     sliderSlide(index);
    }, false);
}