from flask import Blueprint, Flask, jsonify
from ..models import Table



bp = Blueprint("table", __name__, url_prefix="/table")


@bp.route('/', methods=["GET"])
def get_tables():
    tables = Table.query.all()

    return [table.__dict__['number'] for table in tables]
