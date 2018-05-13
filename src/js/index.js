import {last} from './last';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/style.scss';


const testFunc = (a, b) => {
  console.log('>>>>>', a, b);
}

let a = 5;
let b = 6;

testFunc(a, b);

console.log('HELLO!!!', last);