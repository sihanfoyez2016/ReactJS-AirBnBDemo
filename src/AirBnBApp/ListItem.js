import React, { Component } from 'react'


export default class ListItem extends Component {
    onFavoriteButtonClick = () => {
        this.props.onFavClicked(this.props.listItem)
    }
    filterOnClick = () => {
        this.props.filterOnSection();
    }
    render() {
        const { title, image, categoryName, price, isFavorite } = this.props.listItem
        const className = isFavorite ? "fav-selected" : "fav-notselected";
        return (
            <div className='list_item'>
                <img src={image} alt={title} />
                <div className='like_button' onClick={this.onFavoriteButtonClick}>
                    <svg className={className}><path d="M23.993 2.75c-.296 0-.597.017-.898.051-1.14.131-2.288.513-3.408 1.136-1.23.682-2.41 1.621-3.688 2.936-1.28-1.316-2.458-2.254-3.687-2.937-1.12-.622-2.268-1.004-3.41-1.135a7.955 7.955 0 0 0-.896-.051C6.123 2.75.75 4.289.75 11.128c0 7.862 12.238 16.334 14.693 17.952a1.004 1.004 0 0 0 1.113 0c2.454-1.618 14.693-10.09 14.693-17.952 0-6.84-5.374-8.378-7.256-8.378"></path></svg>
                </div>
                <div className='category_name' onClick={this.filterOnClick}>{categoryName}</div>
                <div className='item_title'>{title}</div>
                <div className='item_price'>{price}$ Per person</div>
            </div>
        )
    }
}

