# Cvičení: Dotaz POST

Cvičení do breakrooms pro kurz JavaScript 2 od Czechitas.

## 2. Hlasování

Vytvoříme aplikaci, která umožní hlasovat pro jednotlivé možnosti na webu *Hlasování*. Pro tento účel si vyberte z nabídky jednu otázku, ve které budete hlasovat.

- Založte si nový projekt příkazem

```javascript
npm init kodim-app@latest cviceni-hlasovani html-css-js
```

- Otevřete si ve VS Code vytvořenou složku `cviceni-hlasovani`.
- Prohlédněte si dokumentaci [API pro hlasování](https://apps.kodim.cz/daweb/hlasovani/docs) a pomocí požadavku GET v prohlížeči najděte `id` otázky, kterou jste si ve skupině vybrali.
- Na stránku (do `index.html`) přidejte tlačítko *Hlasovat*. Při stisknutí tlačítka pošlete na API požadavek POST, který zahlasujte vaším jménem pro nějakou vámi zvolenou možnost. Jméno i možnost zatím budou zapsány natvrdo ve vašem kódu. Na stránce [hlavní aplikace](https://apps.kodim.cz/daweb/hlasovani) si ověřte, že se vám povedlo správně zahlasovat.
- Dejte pozor na to, že aplikace nedovolí hlasovat dvakrát se stejným jménem pro tutéž možnost. Pokud chcete poslat další hlas, změňte v kódu jméno na jiné.

## 3. Hlasování jméno

Pokračujte v aplikaci z předchozího příkladu. Mít jméno hlasujícího přímo v kódu je nepraktické. Umožníme tedy uživateli zadat si jméno dle libosti.

Pro připomenutí: když vložíte tlačítko do HTML formuláře `<form>`, prohlížeč sám zajistí odeslání formuláře po kliknutí na tlačítko. Odeslání formuláře způsobí znovunačtení stránky – z pohledu uživatele to vypadá, jako by hned po kliknutí obnovil stránku (třeba klávesou F5). Pokud JavaScript mezi tím něco vypsal do konzole, po obnově stránky se výpis ztratí. Protože k obnově stránky dojde rychle, vypadá to, že se v konzoli nic nestalo.

Aby k odeslání formuláře nedošlo, je potřeba prohlížeči říci, že nemá provádět výchozí akci. K tomu slouží metoda `preventDefault` na události. Tuto metodu byste měli zavolat hned na začátku zpracování události, třeba takhle:

```javascript
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  // pokračování kódu zpracování události 'click'…
});
```

- V programu z minulého cvičení nahraďte hlasovací tlačítko formulářem, který bude obsahovat jedno textové políčko pro zadání jména.
- Při odeslání formuláře zahlasujte pro jednu možnost jménem, které zadal uživatel. Číslo možnosti, pro niž se hlasuje, bude stále natvrdo v kódu.
- Vypište si do konzole, co API endpoint vrátí, pokud se pokusíte zahlasovat dvakrát stejným jménem. Upravte stránku tak, aby v takovém případě zobrazila hlášku ve smyslu *Nelze hlasovat dvakrát se stejným jménem*.