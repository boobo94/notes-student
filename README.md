# notes-student
Website with notes for student

1. npm install - install dependences
2. sudo npm start - run the server


# Mod de instalare

Dacă pe parcursul acestui capitol am vorbit despre cum se poate utiliza acest sistem și care sunt elementele ce îl definesc, în cele ce urmează voi prezenta aspecte ce vor fi destul de importante pentru un administrator de sistem. Instalarea este foarte simplă și se face într-un număr redus de pași. Voi presupune că gazda pe care se dorește rulat nu are instalat nici-unul din utilitarele necesare. Deoarece depinde foarte mult în funcție de sistemul de operare folosit și pentru că este mult mai simplă realizarea unei astfel de configurări pe un sistem de operare cu interfață grafică, dar și pentru ca majoritatea gazdelor oferă o distribuție Linux, voi considera acest sistem pentru explicațiile următore:
Instalare baza de date

1. Se intră în Terminal
2. Se execută comanda următoare pentru a instala serverul pe care va fi rulat SGBD-ul
```$ sudo apt-get install postgresql postgresql-contrib```
3. Procedeul de instalare a creat un utilizator implicit "postgres", acum va trebui să îi setez o parolă, un prompt nou va apărea după rularea comenzii
```$ sudo -i -u postgres```
4. Va trebui să intri în consola postgresql prin executarea următoarei comenzi 
```$ psqld```
5. Tot ce rămâne de făcut este să creez o nouă bază de date 
```$ createdb Students```

Crearea tabelelor și a celorlalte componente, reprezintă responsabilitatea modulului Sequelize.

# Instalare server Node JS

1. Se intră in Terminal
2. Se execută comanda următoare pentru a instala serverul Node JS
```$ sudo apt-get install -y nodejs```

# Rulare Sistem

1. Primul pas este să copiez sursele proiectului, iar pentru asta ne vom folosi de git, vom instala acest utilitar prin rularea comenzii în Terminal
```$ sudo apt-get install git-all```
2. Se merge în folderul în care se dorește instalarea, din terminal
3. Se ruleaza urmatoarea comandă. In prealabil trebuiesc cerute permisiuni de access la depozitul de pe Github
```$ git clone https://github.com/boobo94/notes-student```
4. Acum ca fișierele există pe server trebuiesc instalate dependențele
```$ cd /server```
```$ sudo npm install```
5. Se introduce parola utilizatorului curent
6. Se apasa Enter
7. Trebuiesc adăugate în fișierul de configurări ale serverului datele de conectare ale bazei de date
```$ cd /server/database/config```
```$ sudo vi database.json```
8. Se completează valorile corecte în obiectul production
9. Se apasa tasta ESC
10. În caseta de inserare se tastează :wq și se apasă enter
11. În continuare trebuie să ne asigurăm că este setat modul production
```$ cd ../config```
```$ sudo vi server-config.json```
12. În obiectul environment se seteaza production, iar obiectul production se seteaza conform necesităților
13. Se apasa tasta ESC
14. În caseta de inserare se tastează :wq și se apasă enter
15. Va trebui să modificăm pentru moment linia ce pune în execuție sincronizarea Sequelize cu baza de date
```$ cd ..```
```$ sudo vi server.js```
16. În partea de jos a filei se decomentează linia ce pune în execuție funcția initDB(); prin eliminarea celor doua slash-uri din fața liniei //
17. Se apasă tasta ESC
18. În caseta de inserare se tastează :wq și se apasă enter
19. Acum serverul poate fi rulat, prin executia comenzii următoare:
```$ sudo npm start```
20. Se introduce parola de utilizator al computerului. În cazul în care se primește un mesaj de genul " Server running at http://localhost:8080/", serverul a pornit. Această fereastră nu trebuie închisă pe toata durata cât se dorește funcționare web-service-ului
21. Se deschide un nou Terminal si se rulează comenzile
```$ cd server```
```$ sudo vi server.js```
22. Se comentează înapoi linia ce conține funcția initDB(); prin adăugarea celor doua slash-uri // în fața acesteia
23. Se apasă tasta ESC
24. În caseta de inserare se tastează :wq și se apasă enter
25. Acum că web-service-ul este pornit, este necesară pornirea serverului de client. 
```$ cd ../public```
```$ sudo npm install```
26. În continuare vom modifica adresa url de conectare la webservice
```$ cd /app/core```
```$ sudo vi urls.config.ts```
27. Pe linia 5 vom modifica adresa web la care răspunde webservice-ul, modificând valoarea variabilei baseApiUrl
28. Se apasa tasta ESC
29. În caseta de inserare se tastează :wq și se apasă enter
30. Înainte de rularea serverului avem nevoie să compilăm fișierele sass
```$ cd ../../```
```$ gulp sass```
31. Putem porni serverul pentru client
```$ cd /public```
```$ sudo npm start```
32. Se introduce parola utilizatorului și se apasă ENTER

Acesta este tot procesul pe care un administrator de sistem trebuie sa îl urmeze pentru a rula proiectul.
