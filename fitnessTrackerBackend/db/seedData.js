//dummy data
const users = [{username: 'test', password:12345},
    {username:'test2',password:54321}];
const activities = [{name: 'climbing',description:'you climb rock'},
    {name:'golfing', description:'you golf ball'},
    {name:'hockey', description:'you hock puck'}];
const routines = [{creator_id: 2,is_public:true,name:"RoutineName1",goal:"arbitrary goal 1"},
    {creator_id: 1,is_public:false,name:"RoutineName2",goal:"arbitrary goal 2"},
    {creator_id: 1,is_public:true,name:"RoutineName3",goal:"arbitrary goal 3"}];
const routine_activities = [{routine_id:1,activity_id:2,count:5,duration:2},
    {routine_id:2,activity_id:1,count:3,duration:20},
    {routine_id:3,activity_id:1,count:5,duration:6}];

module.exports = {users, activities, routines, routine_activities};