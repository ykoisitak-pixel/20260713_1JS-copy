// 消費税率の定数の設定
const TAX_RATE = 0.1;

// 入力フィールドの金額(オブジェクト)
const amountInput = document.querySelector('#amount-input');

// btnCalc（計算するボタン）のクリックイベント
const btnCalc = document.querySelector('#btn-calc');

// btnClear（クリアボタン）のクリックイベント
const btnClear = document.querySelector('#btn-clear');

// 外税　税込金額
const amountInclude = document.querySelector('#amount-include');

// 外税　税金額
const taxInclude = document.querySelector('#tax-include');

// 内税　税込金額
const amountExclude = document.querySelector('#amount-exclude');

// 内税 税金額
const taxExclude = document.querySelector('#tax-exclude');

// 外税計算関数（金額の外税込金額と外税金額を返す）
const calcTaxInclude = (amount) => {
    const tax = Math.floor(amount * TAX_RATE);
    const incAmount = Math.floor(amount + tax);
    return { incAmount, tax };
};

// 内税計算関数（金額の内税込金額と内税金額を返す）
const calcTaxExclude = (amount) => {
    const exAmount = Math.floor(amount / (1 + TAX_RATE));
    const tax = Math.floor(amount - exAmount);
    return { exAmount, tax };
};

btnCalc.addEventListener('click', () => {
    // 空の場合はアラートalert() を上げて（alert 文言は「金額を入力してください」としてください）
    if (document.querySelector('#amount-input').value == '') {
        alert('金額を入力してください');
        document.getElementById("amount-input").focus();
        return;
    } else {
        // 作成した関数 calcTaxInclude と calcTaxExclude を呼び出し、数値 amountNum を渡し、計算結果を受け取ります。
        // 数値amountNum への変換
        const amountNum = parseInt(amountInput.value, 10)

        // 外税　税込金額
        const amountInclude = calcTaxInclude(amountNum).incAmount;
        // 外税　税金額
        const taxInclude = calcTaxInclude(amountNum).tax;

        // 内税　税込金額
        const amountExclude = calcTaxExclude(amountNum).exAmount;
        // 内税　税金額
        const taxExclude = calcTaxExclude(amountNum).tax;

        // const taxExclude = Math.floor(parseInt(document.querySelector('#amount-input').value) - amountExclude);

        // 確認用のコンソールログ
        console.log(`税込金額: ${amountInclude}円`);
        console.log(`消費税額: ${taxInclude}円`);
        console.log(`税抜金額: ${amountExclude}円`);
        console.log(`消費税額: ${taxExclude}円`);

        // それぞれの結果表示用の要素（amountInclude などの textContent プロパティ）に計算結果を反映させます。
        document.querySelector('#amount-include').textContent = amountInclude.toLocaleString();
        document.querySelector('#tax-include').textContent = taxInclude.toLocaleString();
        document.querySelector('#amount-exclude').textContent = amountExclude.toLocaleString();
        document.querySelector('#tax-exclude').textContent = taxExclude.toLocaleString();

    }
});

btnClear.addEventListener('click', () => {
    // 入力エリア amountInput の値を空（''）にします。
    document.querySelector('#amount-input').value = '';
    // 画面に表示されているすべての計算結果のテキストを空（''）にします。
    document.querySelector('#amount-include').textContent = "";
    document.querySelector('#tax-include').textContent = "";
    document.querySelector('#amount-exclude').textContent = "";
    document.querySelector('#tax-exclude').textContent = "";
    // 次の入力をスムーズに行えるよう、amountInput に focus() メソッドでカーソルフォーカスを当てます。
    document.getElementById("amount-input").focus();
});
