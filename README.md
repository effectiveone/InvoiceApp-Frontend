# Wprowadzenie do dokumentacji InvoiceApp

Niniejsza dokumentacja opisuje funkcjonalności i cel projektu InvoiceApp, który został stworzony z myślą o grupie holdingowej, która chce zaoszczędzić na usługach księgowych i potrzebuje narzędzia do łatwej i intuicyjnej obsługi faktur. InvoiceApp to narzędzie, które pozwala na automatyzację procesu wystawiania faktur, uproszczenie i usprawnienie przepływu dokumentów oraz umożliwienie szybkiego i wygodnego zarządzania sprzedażą.

W dokumentacji zostaną przedstawione poszczególne sekcje dotyczące architektury aplikacji, testowania, celów programu, jak korzystać z aplikacji oraz wymagań sprzętowych. Opisane zostaną również poszczególne funkcjonalności aplikacji, takie jak wystawianie faktur, zarządzanie bazą kontrahentów i produktów, generowanie statystyk sprzedażowych oraz personalizacja ustawień aplikacji.

Dokumentacja ta ma na celu ułatwienie użytkownikom korzystania z aplikacji oraz zapewnienie pełnej informacji na temat jej funkcjonalności. Wszelkie sugestie oraz uwagi na temat dokumentacji oraz aplikacji są mile widziane.

# Architektura

Architektura jest kluczowa w procesie tworzenia aplikacji, ponieważ wpływa na wiele aspektów jej funkcjonowania. Przede wszystkim, dobrze zaprojektowana architektura wprowadza porządek i umożliwia łatwiejszą modyfikację i rozwój aplikacji w przyszłości. Dzięki temu, aplikacja jest bardziej elastyczna i dostosowana do zmieniających się wymagań biznesowych.

Ponadto, architektura wpływa na wydajność i skalowalność aplikacji. Odpowiednio zaprojektowana architektura pozwala na efektywne wykorzystanie zasobów sprzętowych oraz łatwe dodawanie nowych modułów i funkcjonalności bez konieczności przeprowadzania gruntownych zmian.

Ważnym aspektem architektury jest również bezpieczeństwo aplikacji. Dobrze zaprojektowana architektura może pomóc w minimalizacji ryzyka wystąpienia błędów i podatności na ataki cybernetyczne, co jest szczególnie ważne w przypadku aplikacji przechowujących poufne dane.

Ostatecznie, architektura wpływa na zadowolenie użytkowników końcowych. Dobra architektura umożliwia tworzenie intuicyjnych i przyjaznych dla użytkownika interfejsów, co zwiększa szanse na sukces projektu i zadowolenie klientów.

Jak powiedział Steve Jobs: "Projektowanie to nie tylko jak coś wygląda i czuje się. Projektowanie to jak coś działa." Dlatego tak ważne jest zaprojektowanie dobrej architektury dla każdej aplikacji.

## Użyta architektura
Architektura aplikacji to podstawa, na której opiera się cały projekt. W przypadku InvoiceApp skupiłeś się na tworzeniu łatwo skalowalnej i modularnej aplikacji, aby była ona łatwa w utrzymaniu przez inne osoby.

Do tego celu wykorzystałeś wzorzec trzech warstw, który polega na odseparowaniu aplikacji na trzy części: warstwę prezentacji, biznesową oraz danych. Warstwa prezentacji odpowiada za interfejs użytkownika, warstwa biznesowa zajmuje się logiką biznesową, natomiast warstwa danych odpowiada za interakcje z bazą danych.

Wzorzec container-presenter wykorzystany w aplikacji reacta pozwala na odseparowanie logiki biznesowej od warstwy prezentacji. Za pomocą takich narzędzi jak customowe hooki, context API, czy redux możesz zarządzać stanem aplikacji i przekazywać go między komponentami.

Stosowanie architektury REST w połączeniu z wzorcem trzech warstw pozwala na łatwe integrowanie się z backendem. Dodatkowo, wykorzystanie biblioteki Redux do połączenia z backendem po HTTP, umożliwia odseparowanie logiki biznesowej od warstwy prezentacji.

Stosowanie zasad DRY i SOLID w kodzie pozwala na tworzenie reużywalnego i łatwo rozszerzalnego kodu, co jest istotne w przypadku rozbudowywania aplikacji.

Podsumowując, wykorzystana architektura aplikacji InvoiceApp pozwala na łatwe zarządzanie stanem aplikacji, odseparowanie logiki biznesowej od warstwy prezentacji oraz łatwe rozszerzanie i utrzymywanie kodu przez inne osoby.

## Wzorce projektowe

W projektowaniu aplikacji InvoiceApp korzystałem z zaawansowanych wzorców projektowych, aby zapewnić skalowalność i modularność. Jednym z użytych wzorców był wzorzec fabryki, który umożliwia tworzenie obiektów zgodnie z określonymi parametrami wejściowymi. Przykładem zastosowania tego wzorca jest komponent FactoryInvoicePrinter, który na podstawie wybranego szablonu generuje fakturę w odpowiednim formacie.

```
const FactoryInvoicePrinter = ({ ref }) => {
  const selectedOption = useSelector(
    (state) => state?.settings.settings?.templateInvoice
  );

  switch (selectedOption) {
    case "basicInput":
      return <BasicInvoiceTemplate ref={ref} />;
    case "mediumInput":
      return <MediumInvoiceTemplate ref={ref} />;
    case "printerInput":
      return <SimpleInvoiceTemplate ref={ref} />;
    default:
      return <SimpleInvoiceTemplate ref={ref} />;
  }
};

export default FactoryInvoicePrinter;
```

Kolejnym wykorzystanym wzorcem projektowym był wzorzec strategii, który pozwala na zdefiniowanie rodziny algorytmów, które można zamienić między sobą w trakcie działania aplikacji. Przykładem zastosowania tego wzorca jest hook useSubmitButton, który w zależności od przekazanego parametru zwraca przycisk służący do zapisywania lub edycji danych.

```
mport React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Button: {
    display: "flex",
    flexDirection: "row",
    gap: "150px",
    marginLeft: "50px",
    paddingBottom: "50px",
  },
}));
const useSubmitButton = (handleSubmit, handleSubmitEdit, buttonText) => {
  const classes = useStyles();

  const handleButtonClick = () => {
    buttonText === "Zapisz" ? handleSubmit() : handleSubmitEdit();
  };

  const button = (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={handleButtonClick}
    >
      {buttonText}
    </Button>
  );

  return button;
};

export default useSubmitButton;
```

W projektowaniu InvoiceApp korzystałem również z wzorca obserwator, który pozwala na powiadamianie o zmianach w stanie aplikacji. W ten sposób zaimplementowałem logikę sortowania i filtrowania faktur, która reaguje na zmiany w danych.

```
const sortedInvoices = useMemo(() => {
    let filteredArray = invoiceDate || [];

    if (filterValue) {
      filteredArray = filteredArray?.filter((obj) =>
        obj.selectedKontrahent.companyName
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      );
    }

    const sortedArray =
      filteredArray &&
      filteredArray.length > 0 &&
      filteredArray?.sort((a, b) => {
        if (orderBy === "number") {
          if (order === "asc") {
            return a.invoiceNumber.localeCompare(b.invoiceNumber);
          } else {
            return b.invoiceNumber.localeCompare(a.invoiceNumber);
          }
        } else if (orderBy === "issueDate") {
          if (order === "asc") {
            return a.invoiceSaleDate.localeCompare(b.invoiceSaleDate);
          } else {
            return b.invoiceSaleDate.localeCompare(a.invoiceSaleDate);
          }
        } else if (orderBy === "customer") {
          if (order === "asc") {
            return a.selectedKontrahent.companyName.localeCompare(
              b.selectedKontrahent.companyName
            );
          } else {
            return b.selectedKontrahent.companyName.localeCompare(
              a.selectedKontrahent.companyName
            );
          }
        } else if (orderBy === "netAmount") {
          if (order === "asc") {
            return a.totalNetValue - b.totalNetValue;
          } else {
            return b.totalNetValue - a.totalNetValue;
          }
        } else if (orderBy === "grossAmount") {
          if (order === "asc") {
            return a.totalGrossValue - b.totalGrossValue;
          } else {
            return b.totalGrossValue - a.totalGrossValue;
          }
        }
        return 0;
      });

    return sortedArray;
  }, [invoiceDate, orderBy, order, filterValue]);
  ```

W celu zapewnienia wydajnego zarządzania stanem aplikacji zdecydowałem się wykorzystać context API w połączeniu z Reduxem. W ten sposób mogłem przechowywać stan aplikacji w kontekście i udostępniać go komponentom w odpowiednim momencie. Dzięki temu udało mi się uniknąć props drillingu i stworzyć bardziej czytelny i wydajny kod.

## Użyte biblioteki
W trakcie pracy nad aplikacją InvoiceApp korzystałem z wielu gotowych bibliotek, dzięki czemu udało mi się zaoszczędzić czas i koszty związane z pisaniem całkowicie od podstaw własnego kodu.

Do budowania interfejsu użytkownika wykorzystałem gotowe komponenty biblioteki Material UI. Dzięki temu, że jest to popularna biblioteka, z łatwością znalazłem odpowiednie elementy i dostosowałem je do moich potrzeb, co zaoszczędziło mi sporo czasu.

Do zarządzania stanem aplikacji zdecydowałem się na połączenie Context API z Reduxem, co pozwoliło mi na przechowywanie stanu globalnego aplikacji w wydajny i skalowalny sposób.
Nie bez znaczenia bylo tez uzycie Axios - bibliotekę słuącą do wykonywania zapytań HTTP, która pozwoliła na łatwe komunikowanie się z backendem.

Dodatkowo, w trakcie pracy nad aplikacją, skorzystałem z biblioteki Moment.js - biblioteki do pracy z datami i czasami, co pozwoliło mi na łatwe formatowanie i przetwarzanie dat w aplikacji. 

Oprócz gotowych bibliotek, stworzyłem również własną bibliotekę, która upubliczniłem pod nazwą "liczbyslowempopolsku". Jest to biblioteka, która pozwala na przekształcanie liczb na odpowiadające im słowa, z zachowaniem polskiej fleksji oraz obsługą liczby mnogiej. Jest to bardzo przydatna funkcjonalność w aplikacji InvoiceApp, gdyż pozwala na wyświetlenie kwoty do zapłaty słownie, co jest jednym z wymagań stawianych przez przepisy podatkowe. Biblioteka jest dostępna poprzez Yarna, a jej użycie jest niezbędne w aplikacji InvoiceApp.

Wykorzystanie gotowych bibliotek zdecydowanie przyspieszyło prace nad projektem, pozwoliło zaoszczędzić czas i koszty, a także wprowadziło wiele wartościowych funkcjonalności do aplikacji.

## Zasady nazewnictwa i struktury kodu

Zasady nazewnictwa i struktury kodu, których przestrzegam w projekcie to przede wszystkim zasada jednoznaczności. Nazwy funkcji, klas, zmiennych, czy też plików powinny odzwierciedlać swoje przeznaczenie i być zrozumiałe dla innych programistów. Staram się stosować konwencje nazewnicze zgodne z zasadami BEM, a także korzystać ze wzorca Domain-Driven Design (DDD) w nazewnictwie funkcji.

Kod podzielony jest na sekcje, gdzie w głównym katalogu znajdują się pliki App.js oraz App.css, a także katalogi Auth, Pages, Shared oraz Store.

(stan na 22.03.2023r.)
```
├── App.css
├── App.js
├── Auth
│   ├── LoginPage
│   │   ├── LoginPage.js
│   │   ├── LoginPage.spec.js
│   │   ├── LoginPageFooter.js
│   │   ├── LoginPageFooter.spec.js
│   │   ├── LoginPageHeader.js
│   │   ├── LoginPageHeader.spec.js
│   │   ├── LoginPageInputs.js
│   │   └── LoginPageInputs.spec.js
│   └── RegisterPage
│       ├── RegisterPage.js
│       ├── RegisterPage.spec.js
│       ├── RegisterPageFooter.js
│       ├── RegisterPageFooter.spec.js
│       ├── RegisterPageInputs.js
│       └── RegisterPageInputs.spec.js
├── Pages
│   ├── IssuedInvoicePage.js
│   ├── KontrahentPage.js
│   ├── MyCompanyPage.js
│   ├── NewInvoicePage.js
│   └── SettingsPage.js
├── Shared
│   ├── Components
│   │   ├── AlertNotification.js
│   │   ├── AlertNotification.spec.js
│   │   ├── AllInvoices
│   │   │   ├── InvoicesIssuedList.js
│   │   │   ├── InvoicesIssuedList.spec.js
│   │   │   ├── invoiceComponent.js
│   │   │   └── invoiceComponent.spec.js
│   │   ├── AuthBox.js
│   │   ├── AuthBox.spec.js
│   │   ├── Company
│   │   │   ├── CompanyContent.js
│   │   │   ├── CompanyContent.spec.js
│   │   │   ├── CompanyForm.spec.js
│   │   │   └── companyForm.js
│   │   ├── CustomPrimaryButton.js
│   │   ├── CustomPrimaryButton.spec.js
│   │   ├── FilterWrapper.jsx
│   │   ├── FilterWrapper.spec.js
│   │   ├── InputWithLabel.js
│   │   ├── InputWithLabel.spec.js
│   │   ├── InvoicesTemplates
│   │   │   ├── BasicInvoiceTemplate
│   │   │   ├── MediumInvoiceTemplate
│   │   │   ├── SimpleInvoiceTemplate
│   │   │   └── factoryInvoicePrinter.js
│   │   ├── Kontrahent
│   │   │   ├── ContrahentGrid.js
│   │   │   ├── ContrahentGrid.spec.js
│   │   │   ├── ContrahentModal.js
│   │   │   ├── ContrahentModal.spec.js
│   │   │   ├── ContrahentTable.js
│   │   │   ├── ContrahentTable.spec.js
│   │   │   ├── KontrahentContent.js
│   │   │   └── KontrahentContent.spec.js
│   │   ├── Layout
│   │   │   ├── Dropdown.js
│   │   │   ├── Navbar.js
│   │   │   ├── drawer.js
│   │   │   ├── drawer.spec.js
│   │   │   └── layout.js
│   │   ├── NewInvoice
│   │   │   ├── InvoiceForm.js
│   │   │   ├── InvoiceForm.spec.js
│   │   │   ├── NewInvoice.js
│   │   │   └── NewInvoice.spec.js
│   │   ├── RedirectInfo.js
│   │   ├── RedirectInfo.spec.js
│   │   ├── Settings
│   │   │   ├── CustomSelect.js
│   │   │   ├── CustomSelect.spec.js
│   │   │   ├── Settings.js
│   │   │   ├── Settings.spec.js
│   │   │   ├── templateCheckbox.js
│   │   │   └── templateCheckbox.spec.js
│   │   └── StyleFilterWrapper.jsx
│   ├── Context
│   │   ├── useCompany.spec.js
│   │   ├── useCompanyContext.js
│   │   ├── useInvoice.spec.js
│   │   ├── useInvoiceContext.js
│   │   ├── useKontrahent.spec.js
│   │   └── useKontrahentContext.js
│   ├── Hook
│   │   ├── useCompany.js
│   │   ├── useInvoice.js
│   │   ├── useInvoiceTable.js
│   │   ├── useKontrahent.js
│   │   ├── useModal.js
│   │   ├── useSettings.js
│   │   ├── useSubmitButton.js
│   │   ├── useTheme.js
│   │   └── useUser.js
│   ├── Locales
│   │   ├── en
│   │   │   └── translation.json
│   │   ├── fr
│   │   │   └── translation.json
│   │   └── pl
│   │       └── translation.json
│   └── Utils
│       ├── Icons.jsx
│       ├── api.js
│       ├── auth.js
│       ├── dateValidator.js
│       ├── forms.js
│       ├── tax.js
│       └── validators.js
├── Store
│   ├── actions
│   │   ├── alertActions.js
│   │   ├── authActions.js
│   │   ├── designActions.js
│   │   ├── fakturaActions.js
│   │   ├── kontrahenciActions.js
│   │   ├── mycompanyActions.js
│   │   ├── settingsActions.js
│   │   └── templateActions.js
│   ├── reducers
│   │   ├── alertReducer.js
│   │   ├── authReducer.js
│   │   ├── designReducer.js
│   │   ├── fakturaReducer.js
│   │   ├── kontrahenciReducer.js
│   │   ├── mycompanyReducer.js
│   │   ├── settingsReducer.js
│   │   └── templateReducer.js
│   └── store.js
├── i18n.js
├── index.css
├── index.js
└── serviceWorker.js
```

W katalogu Auth umieszczam pliki LoginPage.js oraz RegisterPage.js, które zawierają kod odpowiedzialny za autoryzację i rejestrację użytkowników. W katalogu Pages znajdują się pliki związane z widokami aplikacji, takie jak IssuedInvoicePage.js, KontrahentPage.js, MyCompanyPage.js, NewInvoicePage.js oraz SettingsPage.js. Każdy plik odpowiada za jeden widok, co pozwala na lepszą separację zadań i zwiększa przejrzystość kodu.

W katalogu Shared umieszczam pliki związane z elementami wspólnymi, takie jak Components, Context, Hook, Locales oraz Utils. W katalogu Components znajdują się komponenty reużywalne w różnych częściach aplikacji. Katalog Context zawiera pliki związane z zarządzaniem stanem aplikacji za pomocą Context API. W katalogu Hook umieszczam własne hooki, które wykorzystuję w różnych miejscach aplikacji. Katalog Locales zawiera pliki związane z obsługą tłumaczeń aplikacji, a w katalogu Utils znajdują się funkcje pomocnicze wykorzystywane w różnych częściach kodu.

W katalogu Store znajdują się pliki związane z zarządzaniem stanem aplikacji za pomocą Redux, takie jak actions, reducers oraz store.js.

Staram się również stosować dobre praktyki programistyczne, takie jak DRY (Don't Repeat Yourself), SOLID (Single Responsibility, Open-Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) oraz Atomic Design, co pozwala na tworzenie przejrzystego, łatwego do utrzymania i rozwijania kodu.

Podsumowując, struktura folderów jest zorganizowana w sposób łatwy do zrozumienia i umożliwia łatwe zarządzanie plikami w projekcie.

# Cel programu

Projekt InvoiceApp został stworzony z myślą o grupie holdingowej, która chce zaoszczędzić na usługach księgowych i potrzebuje narzędzia do łatwej i intuicyjnej obsługi faktur. Głównym celem stworzenia programu jest zautomatyzowanie procesu wystawiania faktur, uproszczenie i usprawnienie przepływu dokumentów oraz umożliwienie szybkiego i wygodnego zarządzania sprzedażą.

Jednym z najważniejszych problemów, który ma rozwiązać program InvoiceApp, jest wysyłanie JPK. Wysyłka JPK (Jednolity Plik Kontrolny) jest obowiązkowa w Polsce i jest to nieodzowny element prowadzenia działalności gospodarczej. Dzięki InvoiceApp użytkownicy będą mogli wykonywać tę czynność w łatwy i szybki sposób, bez konieczności korzystania z dodatkowych narzędzi.

Kolejnym problemem, który rozwiązuje program, jest zarządzanie magazynem. Dzięki InvoiceApp użytkownicy będą mogli w prosty sposób kontrolować ilość towarów w magazynie oraz monitorować, które produkty sprzedają się najlepiej. Program pozwoli również na łatwe zarządzanie stanami magazynowymi i ułatwi kontrolę kosztów związanych z magazynowaniem towarów.

Jednym z celów programu jest oszczędność czasu i pieniędzy. Dzięki InvoiceApp użytkownicy będą mieli łatwy dostęp do wszystkich faktur w jednym miejscu, co pozwoli na szybsze i bardziej efektywne zarządzanie dokumentami. Program automatyzuje wiele procesów związanych z fakturami, co przyczynia się do oszczędności czasu i środków finansowych.

Kolejnym celem programu jest umożliwienie personalizacji projektu. InvoiceApp pozwala na wybór spośród kilku szablonów oraz rodzajów tła, co pozwala na dostosowanie programu do indywidualnych potrzeb użytkowników. Wbudowane tłumaczenia na kilka języków umożliwiają wykorzystanie programu także poza granicami Polski, co stanowi kolejny atut.

Ogólnie rzecz biorąc, celem projektu InvoiceApp jest stworzenie łatwego w obsłudze, intuicyjnego i przyjaznego użytkownikowi narzędzia do wystawiania faktur oraz zarządzania sprzedażą. Program ma pomóc użytkownikom zaoszczędzić czas i pieniądze, a także ułatwić prowadzenie działalności gospodarczej poprzez automatyzację procesów i dostosowanie do indywidualnych potrzeb użytkowników.

# Funkcjonalność
Aplikacja InvoiceApp została zaprojektowana z myślą o umożliwieniu użytkownikom wystawiania faktur, zarządzania bazą kontrahentów oraz produktów wraz z magazynem, generowaniu statystyk sprzedażowych oraz personalizacji ustawień aplikacji.

## Wystawianie faktur
Aplikacja umożliwia użytkownikom łatwe i intuicyjne wystawianie faktur wraz z automatycznym generowaniem numeru faktury oraz numerów pozycji na fakturze. Możliwe jest dodawanie produktów z bazy produktów lub ręczne wprowadzanie pozycji faktury. Każda faktura może zostać w łatwy sposób edytowana, a także usunięta, jeśli jest to konieczne.

## Baza kontrahentów
W aplikacji InvoiceApp istnieje możliwość zarządzania bazą kontrahentów, dzięki czemu użytkownicy mogą szybko i wygodnie dodać nowych kontrahentów oraz edytować lub usunąć już istniejących. Baza ta jest wykorzystywana w procesie wystawiania faktur, co pozwala na szybkie wybieranie kontrahenta z listy bez konieczności ponownego wprowadzania danych.

## Baza produktów oraz magazyn
W aplikacji InvoiceApp użytkownicy mają możliwość zarządzania bazą produktów oraz magazynem. Pozwala to na dodawanie nowych produktów, edycję już istniejących oraz usuwanie ich z bazy. Magazyn umożliwia śledzenie stanu posiadanych produktów oraz ich ilości w magazynie.

## Statystyki sprzedażowe
Dzięki wbudowanym statystykom sprzedażowym użytkownicy mogą śledzić ilość sprzedanych produktów w danym okresie czasu, wartość sprzedaży oraz inne ważne dla nich dane. Statystyki te są wyświetlane w czytelny sposób, dzięki czemu użytkownicy mają łatwy dostęp do kluczowych informacji.

## Ustawienia aplikacji
InvoiceApp umożliwia użytkownikom personalizację ustawień aplikacji. Możliwe jest zmienianie szablonów faktur oraz tła aplikacji, co pozwala na dostosowanie jej do indywidualnych potrzeb użytkowników.

## Możliwość modyfikacji faktur/kontrahentów/usuwania ich
Wszystkie dane wprowadzone przez użytkowników w aplikacji InvoiceApp są modyfikowalne, dzięki czemu użytkownicy mają pełną kontrolę nad swoimi fakturami, kontrahentami oraz produktami. Istnieje również możliwość usuwania wprowadzonych danych, co pozwala na szybkie i skuteczne zarządzanie bazą danych.
## Wymagania sprzętowe
Funkcjonalność projektu InvoiceApp jest dostępna w wersji desktopowej, która jest budowana z wykorzystaniem frameworka Electron. Dzięki temu, użytkownicy mogą zainstalować aplikację na swoich komputerach, niezależnie od systemu operacyjnego. Jednocześnie, program jest dostępny również w trybie developerskim w przeglądarce internetowej, co umożliwia pracę nad projektem bez konieczności instalowania aplikacji na każdym urządzeniu.


