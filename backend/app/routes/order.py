from flask import Blueprint, request, jsonify
from flask_login import login_required
from ..models import Order, OrderDetail, MenuItem, db


bp = Blueprint("order", __name__, url_prefix="/order")


@bp.route("/", methods=["GET","POST","DELETE"])
# @login_required
def open_order():
    if request.method == "POST":
        data = request.get_json()
        print(data)
        new_order = Order(employee_id=data['employee_id'],table_id=data['table_id'], finished=False)
        # new_detail = OrderDetail(order_id=new_order.id)
        # new_detail.order = new_order
        db.session.add(new_order)
        # db.session.add(new_detail)
        db.session.commit()
        return jsonify({'code':200, 'msg':'ok', 'data': {'order_id':new_order.id}})
    elif request.method == "GET":
        all_order = Order.query.filter(Order.finished==False).all()
        # print('hi')
        # print(all_order[0].__dict__)
        res = []
        for i in range(len(all_order)):
            show = {}
            show['table_id'] = all_order[i].__dict__['table_id']
            show['order_id'] = all_order[i].__dict__['id']
            # order_detail = OrderDetail.query.filter(OrderDetail.order_id==all_order[i].__dict__['id']).one()
            # print(order_detail)
            # item_id_list = order_detail[0].__dict__['menu_item_id']
            # total_price = 0
            # if item_id_list:
            #     for item_id in item_id_list:
            #         item = MenuItem.query.filter(MenuItem.id==item_id).one()
            #         price = item[0].__dict__['price']
            #         total_price += price
            # show['price'] = total_price
            res.append(show)
            # print(res)
            return res
    elif request.method == "DELETE":
        data = request.get_json()
        # print('hii')
        # print(data['order_id'])
        res = []
        order = Order.query.filter(Order.id==data['order_id']).one()
        db.session.delete(order)
        db.session.commit()
        de = OrderDetail.query.filter(OrderDetail.order_id==data['order_id']).one()
        # print(de)
        return res
