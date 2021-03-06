import React, { Component } from 'react';
import ABFilters from './ABFilters';
import './style.css';
import { seedSections, filterTypes } from './seedData';
import ABSection from './ABSection';


export default class AirBnBApp extends Component {
    state = {
        allSections: [],
        sectionstoShow: [],
        favorites: [],
        filterTypes: []
    }

    componentDidMount = () => {
        this.setState({
            allSections: seedSections,
            sectionstoShow: seedSections,
            favorites: [],
            filterTypes: filterTypes
        })
    }
    checkFilter = (sectionTypeId) => {
        let filterObject = this.state.filterTypes.find((filterType) => filterType.id == sectionTypeId && filterType.isSelected);
        if (filterObject) {
            return true
        }
        return false
    }

    filterOnSection = (sectionId) => {
        let allSection = this.state.allSections,
            newSections = allSection.filter((section) => section.id === sectionId)
        this.setState({
            sectionstoShow: newSections
        })
    }
    onFilterClicked = (filterType) => {
        let oldFilters = this.state.filterTypes
        oldFilters.map((filter) => {
            if (filter === filterType) {
                filter.isSelected = true
            } else {
                filter.isSelected = false
            }
        })
        this.setState({
            filterTypes: oldFilters
        })
        let newSections = this.state.allSections
        if (filterType.id != 0) {
            newSections = newSections.filter((section) => this.checkFilter(section.typeId))
        }
        this.setState({
            sectionstoShow: newSections
        })
    }
    onFavClicked = (section, item) => {
        // let newItem = item.
        item.isFavorite = !item.isFavorite
        let newFav = this.state.favorites
        if (newFav.includes(item)) {
            const index = newFav.indexOf(item)
            newFav.splice(index, 1)
        } else {
            newFav.push(item)
        }
        this.setState({
            favorites: newFav
        })
    }

    render() {
        const favoriteSection = { id: -999, title: "Your favorites", listings: this.state.favorites }
        let favoriteComp = ''
        if (this.state.favorites.length > 0) {
            favoriteComp = <ABSection key={favoriteSection.id} section={favoriteSection} onFavClicked={this.onFavClicked} />
        }
        return (
            <div className="main ui text container">
                <h1 className="ui dividing centered header">AirBnBDemo</h1>
                <div id="content">
                    <div>
                        <h3>Explore</h3>
                        <ABFilters filterTypes={this.state.filterTypes} onFilterClicked={this.onFilterClicked} />
                    </div>
                    <div>
                        {
                            this.state.sectionstoShow.map
                                (
                                (section) => <ABSection key={section.id} section={section} onFavClicked={this.onFavClicked} filterOnSection={this.filterOnSection} />
                                )
                        }
                    </div>
                    <div>
                        {favoriteComp}
                    </div>
                </div>
            </div>
        )
    }
}