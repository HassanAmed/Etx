pragma solidity >=0.4.15 < 0.6.0;
pragma experimental ABIEncoderV2;
contract Mycontract {

    struct User {
    string fname ;
    string lname ;
    string email;
    }
    User[] private user;

function setUser (string memory first, string memory last, string memory mail )public {
    User memory u1;
    u1.fname = first;
    u1.lname = last;
    u1.email = mail;

    user.push(u1);
}
function getUser (string memory mail)
public view returns (string memory,
                    string memory,
                    string memory)
                    {
    for(uint i = 0; i <= user.length; i++) {
    if (keccak256(abi.encodePacked(user[i].email)) == keccak256(abi.encodePacked(mail)))
       return (user[i].fname, user[i].lname, user[i].email);
    }
}
function allUsers() public view returns (User[] memory) {
    return user;
}
}

