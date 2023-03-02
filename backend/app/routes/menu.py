from flask import Blueprint
from ..models import Menu, MenuItem, MenuItemType

bp = Blueprint("menu", __name__, url_prefix='/menu')

@bp.route('/', methods=['GET'])
def get_menu():
    res = []
    type_list = []
    type_id = []
    type_dic = {}
    types = MenuItemType.query.all()
    for type in types:
        type_list.append(type.__dict__['name'])
        type_id.append(type.__dict__['id'])
    for t in range(len(type_list)):
        type_name = type_list[t]
        type_dic[type_name] = []
        typeId = type_id[t]
        items = MenuItem.query.filter(MenuItem.menu_type_id==typeId).all()
        for item in items:
            info = {}
            # info['item_name'] = item.__dict__['name']
            # info['price'] = item.__dict__['price']
            type_dic[type_name].append(item.__dict__['name'])

    return type_dic
