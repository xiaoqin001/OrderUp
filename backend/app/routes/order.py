from flask import Blueprint, request, jsonify
from flask_login import login_required
from ..models import Order, OrderDetail, MenuItem, db


bp = Blueprint("order", __name__, url_prefix="/order")


@bp.route("/", methods=["GET","POST","DELETE"])
# @login_required
def open_order():
    if request.method == "POST":
        data = request.get_json()
        items = data['data']['items']
        orderId = data['data']['order_id']
        order_detail_id = []
        total_price = 0
        for item in items:
            get_item = MenuItem.query.filter(MenuItem.name==item).one()
            total_price += get_item.price
            # items_id.append(get_item.id)
            new_detail = OrderDetail(order_id=orderId, menu_item_id=get_item.id)
            db.session.add(new_detail)
            db.session.commit()
            order_detail_id.append(new_detail.id)
        # print(new_detail)

        return jsonify({'code':200, 'msg':'ok', 'data': {'order_detail_id':order_detail_id, 'price': total_price}})
        # return jsonify({'code':200, 'msg':'ok', 'data': {'order_id':new_order.id}})
    elif request.method == "GET":
        all_order = Order.query.filter(Order.finished==False).all()
        res = []
        # print(all_order[])
        for i in range(len(all_order)):
            show = {}
            show['table_id'] = all_order[i].__dict__['table_id']
            show['order_id'] = all_order[i].__dict__['id']
            exist = OrderDetail.query.filter(OrderDetail.order_id==all_order[i].__dict__['id']).count()
            if exist == 0:
                total_price = 0
            else:
                order_details = OrderDetail.query.filter(OrderDetail.order_id==all_order[i].__dict__['id']).all()
                # print(order_detail.__dict__)
                total_price = 0
                for order_detail in order_details:
                    item_id = order_detail.__dict__['menu_item_id']
                    item = MenuItem.query.filter(MenuItem.id==item_id).one()
                    # print(item)
                    price = item.__dict__['price']
                    total_price += price
            show['price'] = total_price
            res.append(show)

        return res
    elif request.method == "DELETE":
        data = request.get_json()
        res = []
        order = Order.query.filter(Order.id==data['order_id']).one()
        db.session.delete(order)
        db.session.commit()
        return res
