// const dbPage = require('../controller/model/page');
// const dbUser = require('../controller/model/user');
// const dbWatched = require('../controller/model/watched');
// const schedule = require('node-schedule');

// const reset_at_0h = schedule.scheduleJob('0 0 * * *', function(){
//   autoUpdate();
// });

// const resetView = schedule.scheduleJob('0 */6 * * *', function(){
//     autoResetview();
// });

// async function autoUpdate() {
//     try {
//         const day = new Date();
//         console.log('Reset database day...');
//         console.log(`${day.getHours()}h:${day.getMinutes()}m ${day.getDate()}/${day.getMonth()+1}`);

//         await dbPage.updateMany({clickOfDay: {$ne: 0}},{clickOfDay: 0});
//         await dbUser.updateMany({},{isAttendance: false, click: 0, coinDay: 0});
//         await dbWatched.updateMany({isToDay: false});
//     } catch(err) {
//         console.log({
//             'resetdata': err
//         });
//     }
// }

// async function autoResetview() {
//     try {
//         const day = new Date();
//         console.log('Reset view...');
//         console.log(`${day.getHours()}h:${day.getMinutes()}m ${day.getDate()}/${day.getMonth()+1}`);
//         await dbWatched.updateMany({type: 'view'}, {status: 'delete'});
//     } catch(err) {
//         console.log({
//             'resetdata': err
//         });
//     }
// }
