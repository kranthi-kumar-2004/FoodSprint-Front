import "../css/Orders.css"
function Orders(){
    return(<div>
        <h2>Orders page</h2>
        <button>back</button>
        <div class="ord">
            <div>
                <p>orderId:12kjks</p>
                <p>1X plain Dosa</p>
                <p>1X chiken curry</p>
                <p>price: 150</p>
            </div>
            <div>
                <p>orderId:12kjsdf</p>
                <p>1X punugulu</p>
                <p>1X bondalu</p>
                <p>price: 150</p>
            </div>
            <div>
                <p>orderId:12kjsdfs</p>
                <p>2X Chiken Biriyani</p>
                <p>1X chiken curry</p>
                <p>price: 350</p>
            </div>
        </div>
    </div>);
}
export default Orders;