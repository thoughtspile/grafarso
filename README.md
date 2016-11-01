# grafarso &mdash; сокет для графара

Просто возьмите скрипт из [./build/grafarso.js](build/grafarso.js) и вставьте на страницу.

## API

`grafarso.to(url)` &mdash; подключиться в роли преподавателя.

`grafarso.from(url)` &mdash; подключиться в роли преподавателя.

`grafarso.register(id, callback)` &mdash; основная синхронизация.
- `callback` &mdash; функция, которая принимает параметры и по ним обновляет графар.
- `callback` не принимает функцию в виде параметра (функцию нельзя передать по сокету).
- `callback` не получает значение интерфейса из DOM (иначе на стороне студента она возьмет состояние интерфеса студента).

`grafarso.registerPan(id, Panel)` &mdash; синхронизировать панель Panel по
уникальному идентификатору id.

Также посмотрите примеры: [преподаватель](public/index.html), [студент](public/receiver.html).

## Для разработчиков

- `npm run dev` вотчит и запускает на `:3000`
- `npm run build` собирает в `./build/grafarso.js`
