// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Bazaar is ReentrancyGuard {
    address payable public immutable s_commisionAccount;
    uint256 public immutable s_commision;
    uint256 public s_itemCount;

    struct Item {
        // uint256 itemId;
        IERC721 nft;
        uint256 nftId;
        uint256 price;
        address payable owner;
        bool sold;
    }

    mapping(uint256 => Item) public items;
    mapping(uint256 => address) public s_owners;
    // uint256[] public s_nftIds;

    event Listed(
        // uint256 itemId,
        address indexed nft,
        uint256 nftId,
        uint256 price,
        address indexed owner
    );

    event Sold(
        // uint256 itemId,
        address indexed nft,
        uint256 nftId,
        uint256 price,
        address indexed owner
        // address indexed seller
    );

    event errMsg(string msg, address indexed sender);

    constructor(uint256 _commision) {
        s_commision = _commision;
        s_commisionAccount = payable(msg.sender);
    }

    function createItem(
        IERC721 _nft,
        uint256 _nftId,
        uint256 _price
    ) external nonReentrant {
        require(_price > 0, "price has to be greater than 0");
        // transfer nft from seller to this market
        _nft.transferFrom(msg.sender, address(this), _nftId);
        items[_nftId] = Item(
            // s_itemCount,
            _nft,
            _nftId,
            _price,
            payable(msg.sender),
            false
        );
        if (s_owners[_nftId] == address(0x0)) {
            s_itemCount++;
        }
        s_owners[_nftId] = msg.sender;
        // s_nftIds.push(_nftId);
        emit Listed(address(_nft), _nftId, _price, msg.sender);
    }

    function PurchaseItem(uint256 _nftId) external payable nonReentrant {
        Item storage item = items[_nftId];
        require(_nftId > 0 && _nftId <= s_itemCount, "NFT does not exist");
        require(
            msg.value >= item.price,
            "not enough ether to purchase and cover gas fees"
        );
        require(!item.sold, "NFT already sold");

        uint256 bazaarCommison = comission(item.price);
        uint256 cost = item.price - bazaarCommison;
        //send commission to bazzar;
        (s_commisionAccount).transfer(bazaarCommison);
        //send amount to seller;
        (item.owner).transfer(cost);
        // send nft to buyer;
        (item.nft).transferFrom(address(this), msg.sender, _nftId);
        item.sold = true;

        uint256 refund = msg.value - item.price;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        } else {
            emit errMsg("no refund to this sender", msg.sender);
        }
        s_owners[_nftId] = msg.sender;
        item.owner = payable(msg.sender);
        emit Sold(
            // _itemId,
            address(item.nft),
            item.nftId,
            item.price,
            msg.sender
        );
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function comission(uint _price) public view returns (uint256) {
        return (_price * (s_commision / 100));
    }
}
