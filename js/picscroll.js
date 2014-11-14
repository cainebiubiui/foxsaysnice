(function(){

    var classnumber = {
        'right-one':'right-one',
        'right-two':'right-two',
        'left-one':'left-one',
        'left-two':'left-two',
        'first':'first',
        'last':'last'
    }

    var last_class = '';

    var pic_position = 0;

    var getclasshas = function(obj, cla){
        return caine.has(obj, cla);
    }

    var box = $('.pic-box');

    $('.pic-right').onclick = function(){

        switch (pic_position){
            case 0:
                caine.add(box, 'move-right-one');
                pic_position = 1;
                break;
            case -1:
                caine.remove(box, 'move-left-one');
                pic_position = 0;
                break;
            case -2:
                caine.remove(box, 'move-left-two');
                pic_position = -1;
                break;
            case 1:
                caine.add(box, 'move-right-two');
                pic_position = 2;
                break;
            case 2:
                caine.add(box, 'move-right-last');

                setTimeout(function(){
                    caine.remove(box, 'move-right-last');
                },1000)
                break;
            default:
                return false;
                break;
        }

        io(pic_position);
    }

    $('.pic-left').onclick = function(){

        switch (pic_position){
            case 0:
                caine.add(box, 'move-left-one');
                pic_position = -1;
                break;
            case -1:
                caine.add(box, 'move-left-two');
                pic_position = -2;
                break;
            case -2:
                caine.add(box, 'move-left-last');

                setTimeout(function(){
                    caine.remove(box, 'move-left-last');
                },1000)
                break;
            case 1:
                caine.remove(box, 'move-right-one');
                pic_position = 0;
                break;
            case 2:
                caine.remove(box, 'move-right-two');
                pic_position = 1;
                break;
            default:
                return false;
                break;
        }

        io(pic_position);
    }
})()