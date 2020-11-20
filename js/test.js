$(function(){
    // 格納用の配列
    // let todo_date = [];

    let key = 0;
    // todoリスト
    let todo = [];
    const memo_todo = "memo_todo";

    // 作業中リスト
    let work = [];
    const working_todo = "working_todo";
    
    // 完了リスト
    let done = [];
    const done_todo = "done_todo";

    // ページ読み込み：todoリスト保存データの表示
    if(localStorage.getItem(memo_todo)){
        todo = JSON.parse(localStorage.getItem(memo_todo));
    }

    if(todo !== null && todo.length !==0){
        for(let i = 0; i < todo.length; i++) {
            // getItemのkeyを使って保存されたデータを全部取得
            var value_all = todo[i];
    
            //一覧表示に追加（テンプレートリテラル）
            var html = `
            <li id="todo_list_memo" class="todo_list">
                <span>${value_all}</span>
            </li>`
    
            $("#todo_text").append(html);
            key = i+1;
        }
    }else{
        $("#memo_clear").hide();
    }

    // ページ読み込み：作業中リスト保存データの表示
    if(localStorage.getItem(working_todo)){
        work = JSON.parse(localStorage.getItem(working_todo));
    }

    //　作業中エリア
    if(work !== null && work.length !== 0){
        work = JSON.parse(localStorage.getItem(working_todo));
        for(let i = 0; i < work.length; i++) {
    
            // getItemのkeyを使って保存されたデータを全部取得
            var work_all = work[i];
    
            //一覧表示に追加（テンプレートリテラル）
            var working_html = `
            <li id="working_list_memo" class="working_list">
                <span>${work_all}</span>
            </li>`
    
            $("#working_text").append(working_html);
            key = i+1;
        }
    }else{
        $("#working_clear").hide();
    }

    // ページ読み込み：作業中リスト保存データの表示
    if(localStorage.getItem(done_todo)){
        done = JSON.parse(localStorage.getItem(done_todo));
    }

    if(done !== null && done.length !== 0){
        done = JSON.parse(localStorage.getItem(done_todo));

        for(let i = 0; i < done.length; i++) {
    
            // getItemのkeyを使って保存されたデータを全部取得
            var done_all = done[i];
    
            //一覧表示に追加（テンプレートリテラル）
            var done_html = `
            <li id="done_list_memo" class="done_list">
                <span>${done_all}</span>
            </li>`
    
            $("#done_text").append(done_html);
            key = i+1;
        }
    }else{
        $("#done_clear").hide();
    }



    // todoエリア
    // +カードを追加をクリック
    $("#memo_btn").on("click", () =>{
        // テキストエリア、追加、キャンセルを表示
        $("#memo,#memo_add_btn,#memo_cancel_btn").show();
        // カードを追加を非表示
        $("#memo_btn").hide();
    })

    // キャンセル・カードを削除をクリック
    $("#memo_cancel_btn,#memo_clear, #memo_clear_solo").on("click", () => {
        // テキストエリア、追加、キャンセルを非表示
        $("#memo,#memo_add_btn,#memo_cancel_btn, #memo_move, #memo_clear_solo").hide();
        // カードを追加を表示
        $("#memo_btn").show();
        // 
        $("#todo_text li").css("background-color","");

        //再読み込み
        window.location.reload();
    });

    // カードを追加をクリック
    $("#memo_add_btn").on("click", () => {
        // テキストエリア、追加、キャンセルを非表示
        $("#memo,#memo_add_btn,#memo_cancel_btn").hide();
        // カードを追加を表示
        $("#memo_btn").show();
    });

    // カードを追加クリック
    //複数処理を対策
    $("#memo_add_btn").off("click");
    $("#memo_add_btn").on("click", function() {
        
        //val()で値の取得
        const memo = $("#memo").val();

        // テキストボックスが空の場合には保存しない
        if(!memo) return;

        // todoの配列に追加
        todo.push($("#memo").val());

        // ローカルストレージに保存
        // localStorage.setItem(key, memo);
        localStorage.setItem(memo_todo,JSON.stringify(todo));

        // テキストボックスを空にする
        $("#memo").val("");

        //一覧表示に追加（テンプレートリテラル）
        const html = `
        <li id="todo_list_memo" class="todo_list">
            <span>${memo}</span>
        </li>`

        $("#todo_text").append(html);

        //keyのカウントアップ
        key++;

        //再読み込み
        window.location.reload();
    });

    // #todo_text li（todo_list_memo）をクリック
    $("#todo_text li").on("click",function() {
        //複数処理を対策
        $("#todo_text li").off("click");
        //選択時の色の変更
        $(this).css("background-color","red");
        

        //indexという変数に代入します。何番目か調べる
        let index = $('.todo_list').index(this);

        //値を取得
        let memo_list = todo[index];

        // カードを追加、
        $("#memo,#memo_btn,#memo_cancel_btn").hide();

        // カードの移動＆キャンセルを表示
        $("#memo_move, #memo_cancel_btn, #memo_clear_solo").show();

        //複数処理を対策
        $("#memo_move").off("click");

        // 作業に移動をクリック
        $("#memo_move").on("click",function() {

            // 移動したタスクの背景色を初期化＆隠す
            $("#todo_text li").eq(index).hide().css("background-color","");
            
            // データの挿入
            html_add = `
            <li id="working_list_memo" class="working_list">
                <span>${memo_list}</span>
            </li>`

            // htmlに表示
            $("#working_text").append(html_add);

            //workingのローカルストレージに移動したものを追加
            work.push(todo[index]);
            localStorage.setItem(working_todo,JSON.stringify(work));

            // todoの配列から選択したものを消す
            todo.splice(index, 1);
            // 配列の保存
            localStorage.setItem(memo_todo,JSON.stringify(todo));

            //カードを追加、カードを削除を表示
            $("#memo_move, #memo_cancel_btn").hide();

            // カードを追加を表示
            $("#memo_btn").show();

            //再読み込み
            window.location.reload();
        });
        // このタスクを削除をクリック
        $("#memo_clear_solo").on("click",function() {
            // todoの配列から選択したものを消す
            todo.splice(index, 1);

            // 配列の保存
            localStorage.setItem(memo_todo,JSON.stringify(todo));

            //カードを追加、カードを削除を非表示
            $("#memo_move, #memo_cancel_btn, #memo_clear #memo_clear_solo").hide();

            // カードを追加を表示
            $("#memo_btn").show();

            // //指定した要素にclassを追加
            // $("#todo_list_memo").eq(index).addClass("delet");

            // //指定した要素を削除
            // $(".delet").remove();
            //再読み込み
            window.location.reload();
        });
        //キャンセルクリック
    });

    // clear
    $("#memo_clear").on("click", function() {
        // 保存されたデータを削除
        localStorage.clear();
        // id="todo_text"を削除する
        $("#todo_text").empty("");

        $("#working_text").empty("");

        $("#done_text").empty("");
        // カードを追加を非表示
        $("#done_clear, #working_clear, #memo_clear").hide();
        //再読み込み
        window.location.reload();
    });









    // 作業エリア
    // +カードを追加をクリック
    $("#working_btn").on("click", () =>{
        // テキストエリア、追加、キャンセルを表示
        $("#working_area, #working_add_btn, #working_cancel_btn").show();
        // カードを追加を非表示
        $("#working_btn").hide();
    })

    // キャンセル・カードを削除をクリック
    $("#working_cancel_btn,#working_clear, #working_clear_solo").on("click", () => {
        // テキストエリア、追加、キャンセルを非表示
        $("#working_area,#working_add_btn,#working_cancel_btn, #working_move, #working_clear_solo").hide();
        // カードを追加を表示
        $("#working_btn").show();
        // 
        $("#working_text li").css("background-color","");
        //再読み込み
        window.location.reload();
    });

    // カードを追加をクリック
    $("#working_add_btn").on("click", () => {
        // テキストエリア、追加、キャンセルを非表示
        $("#working_area,#working_add_btn,#working_cancel_btn").hide();
        // カードを追加を表示
        $("#working_btn").show();
    });

    // カードを追加クリック
    $("#working_add_btn").on("click", function() {
        
        //val()で値の取得
        const working = $("#working_area").val();

        // テキストボックスが空の場合には保存しない
        if(!working) return;

        // todoの配列に追加
        work.push($("#working_area").val());

        // ローカルストレージに保存
        // localStorage.setItem(key, memo);
        localStorage.setItem(working_todo,JSON.stringify(work));

        // テキストボックスを空にする
        $("#working_area").val("");

        //一覧表示に追加（テンプレートリテラル）
        const html = `
        <li id="working_list_memo" class="working_list">
            <span>${work}</span>
        </li>`

        $("#working_text").append(html);

        //keyのカウントアップ
        key++;

        //再読み込み
        window.location.reload();
    });

    // #todo_text li（todo_list_memo）をクリック
    $("#working_text li").on("click",function() {
        //複数処理を対策
        $("#working_text li").off("click");

        //選択時の色の変更
        $(this).css("background-color","red");
        

        //indexという変数に代入します。何番目か調べる
        let index_work = $('.working_list').index(this);

        //keyの取得
        // let key_m1 = localStorage.key(index);

        //値を取得
        // let memo_list = localStorage.getItem(key_m1);
        let work_list = work[index_work];

        // カードを追加、
        $("#working_area,#working_btn,#working_cancel_btn").hide();

        // カードの移動＆キャンセルを表示
        $("#working_move, #working_cancel_btn, #working_clear_solo").show();

        //複数処理を対策
        $("#working_move").off("click");

        // 完了に移動をクリック
        $("#working_move").on("click",function() {

            // 移動したタスクの背景色を初期化＆隠す
            $("#working_text li").eq(index_work).hide().css("background-color","");
            
            // データの挿入
            html_add = `
            <li id="done_list_memo" class="done_list">
                <span>${work_list}</span>
            </li>`

            // htmlに表示
            $("#done_text").append(html_add);

            //完了のローカルストレージに移動したものを追加
            done.push(work[index_work]);
            localStorage.setItem(done_todo,JSON.stringify(done));

            // todoの配列から選択したものを消す
            work.splice(index_work, 1);
            // 配列の保存
            localStorage.setItem(working_todo,JSON.stringify(work));

            //カードを追加、カードを削除を表示
            $("#working_move, #working_cancel_btn").hide();

            // カードを追加を表示
            $("#working_btn").show();

            //再読み込み
            window.location.reload();
        });
        // このタスクを削除をクリック
        $("#working_clear_solo").on("click",function() {
            // todoの配列から選択したものを消す
            work.splice(index_work, 1);

            // 配列の保存
            localStorage.setItem(working_todo,JSON.stringify(work));

            //カードを追加、カードを削除を非表示
            $("#working_move, #working_cancel_btn, #working_clear #working_clear_solo").hide();

            // カードを追加を表示
            $("#working_btn").show();

            //再読み込み
            window.location.reload();
        });
        //キャンセルクリック
    });


    // clear
    $("#working_clear").on("click", function() {
        // 保存されたデータを削除
        localStorage.clear();
        // id="todo_text"を削除する
        $("#todo_text").empty("");

        $("#working_text").empty("");

        $("#done_text").empty("");

        // カードを追加を非表示
        $("#done_clear, #working_clear, #memo_clear").hide();

        //再読み込み
        window.location.reload();
    });










// 完了エリア
    // +カードを追加をクリック
    $("#done_btn").on("click", () =>{
        // テキストエリア、追加、キャンセルを表示
        $("#done_area, #done_add_btn, #done_cancel_btn").show();
        // カードを追加を非表示
        $("#done_btn").hide();
    })

    // キャンセル・カードを削除をクリック
    $("#done_cancel_btn,#done_clear, #done_clear_solo").on("click", () => {
        // テキストエリア、追加、キャンセルを非表示
        $("#done_area,#done_add_btn,#done_cancel_btn, #done_clear_solo").hide();
        // カードを追加を表示
        $("#done_btn").show();
        // 
        $("#done_text li").css("background-color","");
        //再読み込み
        window.location.reload();
    });

    // カードを追加をクリック
    $("#done_add_btn").on("click", () => {
        // テキストエリア、追加、キャンセルを非表示
        $("#done_area,#done_add_btn,#done_cancel_btn").hide();
        // カードを追加を表示
        $("#done_btn").show();
    });

    // カードを追加クリック
    $("#done_add_btn").on("click", function() {
        
        //val()で値の取得
        const done_area = $("#done_area").val();

        // テキストボックスが空の場合には保存しない
        if(!done_area) return;

        // todoの配列に追加
        done.push($("#done_area").val());

        // ローカルストレージに保存
        localStorage.setItem(done_todo,JSON.stringify(done));

        // テキストボックスを空にする
        $("#done_area").val("");

        //一覧表示に追加（テンプレートリテラル）
        const html = `
        <li id="done_list_memo" class="done_list">
            <span>${done}</span>
        </li>`

        $("#done_text").append(html);

        //keyのカウントアップ
        key++;

        //再読み込み
        window.location.reload();
    });

    // #todo_text li（todo_list_memo）をクリック
    $("#done_text li").on("click",function() {
        //複数処理を対策
        $("#done_text li").off("click");
        //選択時の色の変更
        $(this).css("background-color","red");
        

        //indexという変数に代入します。何番目か調べる
        let index_done = $('.done_list').index(this);

        //値を取得
        let done_list = done[index_done];

        // カードを追加、
        $("#done_area,#done_btn,#done_cancel_btn").hide();

        // カードの移動＆キャンセルを表示
        $("#done_cancel_btn, #done_clear_solo").show();

        //複数処理を対策
        $("done_move").off("click");

        // このタスクを削除をクリック
        $("#done_clear_solo").on("click",function() {
            // todoの配列から選択したものを消す
            done.splice(index_done, 1);

            // 配列の保存
            localStorage.setItem(done_todo,JSON.stringify(done));

            //カードを追加、カードを削除を非表示
            $("#done_move, #done_cancel_btn, #done_clear #done_clear_solo").hide();

            // カードを追加を表示
            $("#done_btn").show();

            //再読み込み
            window.location.reload();
        });
        //キャンセルクリック
    });


    // clear
    $("#done_clear").on("click", function() {
        // 保存されたデータを削除
        localStorage.clear();
        // id="todo_text"を削除する
        $("#todo_text").empty("");

        $("#working_text").empty("");

        $("#done_text").empty("");
        // カードを追加を非表示
        $("#done_clear, #working_clear, #memo_clear").hide();

        //再読み込み
        window.location.reload();
    });

});
